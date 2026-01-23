import { Payload } from 'payload';
import { migrateMedia } from './utils/migrate-media';
import { fetchStrapiData } from './utils/fetch-strapi';
import StrapiMenuResponse from './types/menu.strapi.type';

interface MenuItem {
  order?: number | null;
  title: string;
  url?: string | null;
  target?: string | null;
  customImage?: string | number | null;
  childrens?: MenuItem[]; // Level 2 items (children of Level 1)
  subItems?: MenuItem[]; // Level 3 items (children of Level 2) - different name to avoid DB relation conflict
  _strapiId?: number; // Internal tracking for image migration
}

/**
 * Converts Strapi's parent-based menu structure to Payload's nested children structure
 * Strapi uses parent relationships, Payload uses nested children arrays
 *
 * Supports 3 levels of nesting (Level 1 -> Level 2 -> Level 3):
 * - Level 1: Root menu items (e.g., "Shop Metals")
 * - Level 2: Submenu items (e.g., "Gold", "Silver") - stored in 'childrens' field
 * - Level 3: Sub-submenu items (e.g., "Gold Coins", "Gold Bars") - stored in 'subItems' field
 *
 * Note: Level 2 uses 'childrens', Level 3 uses 'subItems' to avoid database relation name conflicts
 */
function convertMenuItemsToNestedStructure(
  strapiItems: StrapiMenuResponse['data'][0]['attributes']['items']['data'],
): MenuItem[] {
  // Find root items (items without parents) - these are Level 1 items
  const rootItems = strapiItems.filter((item) => !item.attributes.parent?.data);

  // Recursively build nested structure
  function buildMenuItem(
    strapiItem: StrapiMenuResponse['data'][0]['attributes']['items']['data'][0],
    currentDepth = 0,
  ): MenuItem {
    const menuItem: MenuItem = {
      order: strapiItem.attributes.order ?? null,
      title: strapiItem.attributes.title,
      url: strapiItem.attributes.url ?? null,
      target:
        (strapiItem.attributes.target as '_self' | '_blank' | '_parent' | '_top' | null) ?? null,
      _strapiId: strapiItem.id, // Track Strapi ID for image migration
    };

    // Find children (items where parent.id == this item.id)
    const children = strapiItems.filter(
      (item) => item.attributes.parent?.data?.id === strapiItem.id,
    );

    if (children.length > 0) {
      const childItems = children
        .map((child) => buildMenuItem(child, currentDepth + 1))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      // Level 1 items use 'childrens' field, Level 2 items use 'subItems' field
      if (currentDepth === 0) {
        // Level 1 -> Level 2: use 'childrens'
        menuItem.childrens = childItems;
      } else if (currentDepth === 1) {
        // Level 2 -> Level 3: use 'subItems'
        menuItem.subItems = childItems;
      }
    }

    return menuItem;
  }

  // Build the menu structure starting from root items (Level 1)
  return rootItems
    .map((item) => buildMenuItem(item, 0))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/**
 * Migrates custom images for menu items recursively using Strapi ID tracking
 * Processes images at all nesting levels (Level 1, Level 2, Level 3)
 */
async function migrateMenuItemImages(
  payload: Payload,
  strapiItems: StrapiMenuResponse['data'][0]['attributes']['items']['data'],
  menuItems: MenuItem[],
): Promise<void> {
  // Create a map of Strapi items by ID for quick lookup
  const strapiItemsMap = new Map<
    number,
    StrapiMenuResponse['data'][0]['attributes']['items']['data'][0]
  >();
  strapiItems.forEach((item) => {
    strapiItemsMap.set(item.id, item);
  });

  // Recursively process images at all nesting levels
  async function migrateImagesRecursive(items: MenuItem[]): Promise<void> {
    for (const item of items) {
      // Use tracked Strapi ID to find the original item
      if (item._strapiId) {
        const strapiItem = strapiItemsMap.get(item._strapiId);

        if (strapiItem?.attributes.custom_image?.data) {
          console.log(`Migrating custom image for menu item: ${item.title}`);
          const imageId = await migrateMedia(payload, strapiItem.attributes.custom_image, 'menu');
          if (imageId) {
            item.customImage = imageId;
          }
        }
      }

      // Recursively process childrens (Level 2 items)
      if (item.childrens && item.childrens.length > 0) {
        await migrateImagesRecursive(item.childrens);
      }

      // Recursively process subItems (Level 3 items)
      if (item.subItems && item.subItems.length > 0) {
        await migrateImagesRecursive(item.subItems);
      }
    }
  }

  await migrateImagesRecursive(menuItems);
}

/**
 * Removes internal tracking fields before saving to Payload
 * Recursively cleans all nesting levels (Level 1, Level 2, Level 3)
 */
function cleanMenuItem(item: MenuItem): Omit<MenuItem, '_strapiId'> {
  const cleaned: Omit<MenuItem, '_strapiId'> = {
    order: item.order,
    title: item.title,
    url: item.url,
    target: item.target,
    customImage: item.customImage,
  };

  // Recursively clean childrens (Level 2 items)
  if (item.childrens && item.childrens.length > 0) {
    cleaned.childrens = item.childrens.map((child) => cleanMenuItem(child));
  }

  // Recursively clean subItems (Level 3 items)
  if (item.subItems && item.subItems.length > 0) {
    cleaned.subItems = item.subItems.map((subItem) => cleanMenuItem(subItem));
  }

  return cleaned;
}

export async function migrateMenu(payload: Payload) {
  try {
    console.log('Starting Menu migration...');

    // Fetch data from Strapi API
    const strapiData = await fetchStrapiData<StrapiMenuResponse>('menus');
    console.log('Successfully fetched Menu data from Strapi');

    // For now, we'll migrate the first menu (typically "navigation")
    // If you have multiple menus, you can extend this to handle all of them
    if (!strapiData.data || strapiData.data.length === 0) {
      throw new Error('No menu data found in Strapi response');
    }

    const menuData = strapiData.data[0];
    const { attributes } = menuData;

    console.log(`Migrating menu: ${attributes.title} (slug: ${attributes.slug})`);

    // Convert Strapi's parent-based structure to Payload's nested children structure
    // Supports 3 levels: Level 1 (root) -> Level 2 (submenu) -> Level 3 (sub-submenu)
    console.log('Converting menu structure...');
    const menuItems = convertMenuItemsToNestedStructure(attributes.items.data);
    console.log(`Converted ${menuItems.length} root menu items (Level 1)`);

    // Count total items across all levels for logging
    function countItems(items: MenuItem[]): number {
      let count = items.length;
      for (const item of items) {
        if (item.childrens && item.childrens.length > 0) {
          count += countItems(item.childrens);
        }
        if (item.subItems && item.subItems.length > 0) {
          count += countItems(item.subItems);
        }
      }
      return count;
    }
    const totalItems = countItems(menuItems);
    console.log(`Total menu items across all levels: ${totalItems}`);

    // Migrate custom images for menu items
    console.log('Migrating menu item images...');
    await migrateMenuItemImages(payload, attributes.items.data, menuItems);

    // Clean up internal tracking fields before saving
    const cleanedMenuItems = menuItems.map((item) => cleanMenuItem(item));

    // Create menu global
    const menuGlobalData = {
      title: attributes.title,
      items: cleanedMenuItems,
    } as any; // Type assertion needed - IDs may be string or number

    console.log('Creating Menu global...');
    await payload.updateGlobal({
      slug: 'menu',
      data: menuGlobalData,
    });
    console.log('Menu global created successfully');

    console.log('Menu migration completed successfully');
  } catch (error) {
    console.error('Error migrating menu', JSON.stringify(error, null, 2));
    throw error;
  }
}
