const API_URL = 'https://inspired-by-rush.dev1.bwmmedia.com/' //process.env.WORDPRESS_API_URL

async function fetchAPINormal( url: string ) {
    try {
        const response = await fetch( url );
        return await response.json();
    } catch (e) {
        console.error("Error while fetching PWS API:", e);
    }
  };
  
export async function getHomePageData() {
    const data = await fetchAPINormal( `${API_URL}wp-json/wp/v2/home-data/`)
    // const data = await fetchAPINormal('http://iheartclayandbuck.local/wp-json/wp/v2/home-data/')
    return data;
}

export async function getMoreStories( crPage: number, perPage: number, excludeStories: string) {
    const data = await fetchAPINormal( `${API_URL}wp-json/wp/v2/top-stories/?crPage=${crPage}&perPage=${perPage}&excludeStories=${excludeStories}`)
    // const data = await fetch( `http://iheartclayandbuck.local/wp-json/wp/v2/top-stories/?crPage=${crPage}&perPage=${perPage}&excludeStories=${excludeStories}` );
    return await data.json();
}