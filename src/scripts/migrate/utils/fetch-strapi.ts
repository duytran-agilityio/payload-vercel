import { env } from '@/libs/env';

/**
 * Fetches data from Strapi API
 * @param endpoint - The Strapi API endpoint (e.g., 'bunker', 'about')
 * @param populate - The populate parameter (defaults to 'deep')
 * @param publicationState - The publication state ('live' for published only, 'preview' for all including drafts). Defaults to 'preview' to get full data.
 * @returns The fetched data as the specified type
 * @throws Error if the fetch fails
 */
export async function fetchStrapiData<T>(
  endpoint: string,
  populate: string = 'deep',
  publicationState: 'live' | 'preview' = 'preview',
): Promise<T> {
  const apiUrl = env.STRAPI_API_URL;
  const apiToken = env.STRAPI_API_TOKEN;

  const url = `${apiUrl}/api/${endpoint}?populate=${populate}&publicationState=${publicationState}`;
  console.log(`Fetching ${endpoint} data from ${url}...`);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${endpoint} data from Strapi: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  return data as T;
}
