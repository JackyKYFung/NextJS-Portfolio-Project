const BASE_URL = "https://jfunki.com/wp-json/wp/v2";

export async function getData(endpoint: string, queryParams: string = "") {
    // Ensure queryParams starts with & if it exists
    const formattedParams = queryParams ? `&${queryParams}` : "";
    const url = `${BASE_URL}/${endpoint}?_embed${formattedParams}`;

    const res = await fetch(url, { 
        cache: 'no-store',
        next: { revalidate: 0 } 
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch data from ${endpoint}`);
    }

    return res.json();
}
