import type { Field, GlobalConfig } from 'payload';

/**
 * Creates menu item fields with optional nested children
 * Supports hierarchical menu structures (main items -> submenu -> sub-submenu)
 * Maximum depth: 3 levels (Level 1 -> Level 2 -> Level 3)
 *
 * This matches the structure of strapi-plugin-menus:
 * - Menu (CollectionType) with title, slug, items
 * - MenuItem (CollectionType) with order, title, url, target, parent, custom_image
 */
const createMenuItemFields = (currentDepth = 1, maxDepth = 3): Field[] => {
  const baseFields: Field[] = [
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Display order (lower numbers appear first)',
        step: 1,
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Menu item label',
      },
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        description:
          'Link URL (e.g., "/about", "https://example.com", or leave empty for parent items)',
      },
    },
    {
      name: 'target',
      type: 'select',
      options: [
        {
          label: 'Same Window (_self)',
          value: '_self',
        },
        {
          label: 'New Window (_blank)',
          value: '_blank',
        },
        {
          label: 'Parent Frame (_parent)',
          value: '_parent',
        },
        {
          label: 'Top Frame (_top)',
          value: '_top',
        },
      ],
      defaultValue: '_self',
      admin: {
        description: 'Link target behavior',
      },
    },
    {
      name: 'customImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional image for the menu item (matches Strapi custom_image extension)',
      },
    },
  ];

  // Only add children field if we haven't reached max depth
  // Use unique field names for each nesting level to avoid database relation conflicts
  if (currentDepth < maxDepth) {
    // Use different field names for each level to avoid database relation name conflicts
    // Level 1 -> 'children' (Level 2)
    // Level 2 -> 'subItems' (Level 3)
    const fieldName = currentDepth === 1 ? 'childrens' : 'subItems';

    baseFields.push({
      name: fieldName,
      type: 'array',
      label: 'Childrens',
      admin: {
        description: `Nested menu items (Level ${currentDepth + 1} of ${maxDepth})`,
        components: {
          RowLabel: '/components/ArrayRowLabel',
        },
      },
      fields: createMenuItemFields(currentDepth + 1, maxDepth), // Recursively create children with incremented depth
    });
  }

  return baseFields;
};

export const Menu: GlobalConfig = {
  slug: 'menu',
  label: 'Menu',
  admin: {
    description: 'Site navigation menu configuration. Supports nested submenus.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Menu title (for admin reference only)',
        placeholder: 'Main Navigation',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Menu Items',
      admin: {
        description: 'Main navigation menu items. Supports nested submenus.',
        components: {
          RowLabel: '/components/ArrayRowLabel',
        },
      },
      fields: createMenuItemFields(1, 3), // Start at level 1, max depth 3
    },
  ],
};
