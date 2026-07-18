import { tavily, type TavilyClient } from "@tavily/core"
import type { TavilySearchOptions, TavilyClientOptions, TavilyExtractOptions, TavilyCrawlOptions, TavilyResearchOptions } from "@tavily/core";
import type { TavilySearchResponse, TavilyCrawlResponse, TavilyExtractResponse } from "@tavily/core";
import type { ExtractProvider, SearchProvider, BaseParams, CrawlProvider, ResearchProvider } from "@search-sdk/core";



export interface TavilySearchParams extends BaseParams, TavilySearchOptions { }
interface CrawlBaseParam {
    url: string;
}
interface ExtractBaseParam {
    urls: string[];
}

interface ResearchBaseParam {
    input: string;
}

type ExtractParams = ExtractBaseParam & TavilyExtractOptions;
type CrawlParams = CrawlBaseParam & TavilyCrawlOptions;
type ResearchParams = ResearchBaseParam & TavilyResearchOptions;
type ResearchResult = Awaited<ReturnType<TavilyClient["research"]>>;


export class TavilyProvider
    implements
    SearchProvider<TavilySearchParams, TavilySearchResponse>,
    ExtractProvider<ExtractParams, TavilyExtractResponse>,
    CrawlProvider<CrawlParams, TavilyCrawlResponse>,
    ResearchProvider<ResearchParams, ResearchResult> {

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
    async research(params: ResearchParams): Promise<ResearchResult> {
        const { input, ...options } = params;
        const response = await this.#client.research(input, options);
        return response;
    }
}