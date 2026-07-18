import type { SearchProvider } from "@search-sdk/core";

export class DuckDuckGo implements SearchProvider<any, any> {

    #baseUrl: string;

    constructor(baseUrl: string = "https://api.duckduckgo.com/") {
        this.#baseUrl = baseUrl;
    }

    async search(params: any): Promise<any> {
        const { query } = params;
        const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`);
        const data = await response.json();
        return data;
    }
}