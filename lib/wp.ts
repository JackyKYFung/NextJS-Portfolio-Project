const BASE_URL = "https://jfunki.com/wp-json/wp/v2";

export async function getData (endpoint: string, queryParams: string = "") {
    const url = `${BASE_URL}/${endpoint}?_embed${queryParams}`;

    const res = await fetch(url, { next: { revalidate: 3600 },
    cache: 'no-store' } );
    //revalidate checks Wordpress for changes every 3600 seconds

    if (!res.ok) {
        throw new Error(`Failed to fetch data from ${endpoint}`);
    }

    return res.json();
}