const REST_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL

/**
 * Fetch data by REST API
 * @param url 
 * @returns 
 */
async function fetchAPINormal( url: string ) {
    try {
        const response = await fetch( `${REST_API_URL}${url}` );
        return await response.json();
    } catch (e) {
        console.error("Error while fetching PWS API:", e);
    }
  };
  
/**
 * Get data for Homepage
 * @returns 
 */
export async function getHomePageData() {
    const data = await fetchAPINormal( `/v2/home-data/`)
    return data;
}
/**
 * Get Top Stories
 * @param crPage 
 * @param perPage 
 * @param excludeStories 
 * @returns 
 */
export async function getTopStories( crPage: number, perPage: number, excludeStories: string) {
    const data = await fetchAPINormal( `/v2/top-stories/?crPage=${crPage}&perPage=${perPage}&excludeStories=${excludeStories}`)
    return data;
}