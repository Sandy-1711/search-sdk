export interface CrawlProvider<TParams = unknown, TResult = unknown> {
    crawl(params: TParams): Promise<TResult>;
}