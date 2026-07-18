import type { SearchProvider, BaseParams } from "@search-sdk/core";
import type { TavilyClient, TavilySearchOptions, TavilyClientOptions, TavilyExtractOptions, TavilyCrawlOptions } from "@tavily/core";
import { tavily } from "@tavily/core"
import type { ExtractProvider } from "@search-sdk/core";
import type { CrawlProvider } from "@search-sdk/core";



export interface TavilySearchParams extends BaseParams, TavilySearchOptions { }
interface CrawlBaseParam {
    url: string;
}
interface ExtractBaseParam {
    urls: string[];
}

type ExtractParams = ExtractBaseParam & TavilyExtractOptions;
type CrawlParams = CrawlBaseParam & TavilyCrawlOptions;


export class TavilyProvider implements SearchProvider<TavilySearchParams, any>,
    ExtractProvider<ExtractParams, any>,
    CrawlProvider<CrawlParams, any> {

    #client: TavilyClient;
    constructor(config: TavilyClientOptions) {
        this.#client = tavily(config)
    }
    async search(params: TavilySearchParams): Promise<any> {
        const { query } = params;
        const response = await this.#client.search(query, params);
        return response;
    }
    async extract(params: ExtractParams): Promise<any> {
        const { urls } = params;
        const response = await this.#client.extract(urls, params);
        return response;
    }
    async crawl(params: CrawlParams): Promise<any> {
        const { url } = params;
        const response = await this.#client.crawl(url, params);
        return response;
    }
}