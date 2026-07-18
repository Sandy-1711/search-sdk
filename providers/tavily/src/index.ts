import type { SearchProvider, BaseParams } from "@search-sdk/core";
import type { TavilyClient, TavilySearchOptions, TavilyClientOptions } from "@tavily/core";
import { tavily } from "@tavily/core"



export interface TavilySearchParams extends BaseParams, TavilySearchOptions { }

export class TavilyProvider implements SearchProvider<TavilySearchParams, any> {

    #client: TavilyClient;
    constructor(config: TavilyClientOptions) {
        this.#client = tavily(config)
    }
    async search(params: TavilySearchParams): Promise<any> {
        const { query } = params;
        const response = await this.#client.search(query, params);
        return response;
    }
}