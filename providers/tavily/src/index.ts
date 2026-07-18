import { tavily, type TavilyClient } from "@tavily/core"
import type { TavilySearchOptions, TavilyClientOptions, TavilyExtractOptions, TavilyCrawlOptions, } from "@tavily/core";
import type { TavilySearchResponse, TavilyCrawlResponse, TavilyExtractResponse } from "@tavily/core";
import type { ExtractProvider, SearchProvider, BaseParams, CrawlProvider } from "@search-sdk/core";



export interface TavilySearchParams extends BaseParams, TavilySearchOptions { }
interface CrawlBaseParam {
    url: string;
}
interface ExtractBaseParam {
    urls: string[];
}

type ExtractParams = ExtractBaseParam & TavilyExtractOptions;
type CrawlParams = CrawlBaseParam & TavilyCrawlOptions;


export class TavilyProvider implements SearchProvider<TavilySearchParams, TavilySearchResponse>,
    ExtractProvider<ExtractParams, TavilyExtractResponse>,
    CrawlProvider<CrawlParams, TavilyCrawlResponse> {

    #client: TavilyClient;
    constructor(config: TavilyClientOptions) {
        this.#client = tavily(config)
    }
    async search(params: TavilySearchParams): Promise<TavilySearchResponse> {
        const { query, ...options } = params;
        const response = await this.#client.search(query, options);
        return response;
    }
    async extract(params: ExtractParams): Promise<TavilyExtractResponse> {
        const { urls, ...options } = params;
        const response = await this.#client.extract(urls, options);
        return response;
    }
    async crawl(params: CrawlParams): Promise<TavilyCrawlResponse> {
        const { url, ...options } = params;
        const response = await this.#client.crawl(url, options);
        return response;
    }
}