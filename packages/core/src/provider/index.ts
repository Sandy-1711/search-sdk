export interface BaseParams {
    query: string;
    options?: Record<string, unknown>;
}

export interface SearchProvider<
    TParams extends BaseParams = BaseParams,
    TResult = unknown
> {
    search(params: TParams): Promise<TResult>;
}

export type InferParams<T> = T extends SearchProvider<infer P, any> ? P : never;
export type InferResult<T> = T extends SearchProvider<any, infer R> ? R : never;