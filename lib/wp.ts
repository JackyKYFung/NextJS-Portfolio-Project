const BASE_URL = "https://jfunki.com/wp-json/wp/v2";

// 1. Your existing Swiss-Army-Knife function
export async function getData(endpoint: string, queryParams: string = "") {
    const formattedParams = queryParams ? `&${queryParams}` : "";
    const url = `${BASE_URL}/${endpoint}?_embed${formattedParams}`;

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return res.json();
}

// 2. A specialized function for single projects
export async function getProjectBySlug(slug: string) {
    const data = await getData("project", `slug=${slug}`);
    // Return the first item in the array, or null if it's empty
    return data.length > 0 ? data[0] : null;
}
