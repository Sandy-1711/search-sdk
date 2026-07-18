export interface ExtractProvider<TParams = unknown, TResult = unknown> {
    extract(params: TParams): Promise<TResult>;
}