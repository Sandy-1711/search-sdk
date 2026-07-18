import { SearchProvider } from "@search-sdk/core";
import { TavilyClient } from "@tavily/core";

export class TavilyProvider implements SearchProvider<any, any> {
    private client: TavilyClient;

    constructor(client: TavilyClient) {
        this.client = client;
    }
    async search(params: any): Promise<any> {
        const response = await this.client.search(params);
        return response;
    }
}