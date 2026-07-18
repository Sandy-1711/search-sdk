import { SearchProvider, type InferParams, type InferResult } from "./provider";

interface SearchConfig<TProvider extends SearchProvider<any, any>> {
    P: TProvider;
}

export class Search<
    P extends SearchProvider<any, any>,
> {
    #TProvider: P;
    constructor(
        config: SearchConfig<P>
    ) {
        this.#TProvider = config.P;
    }
    invoke(params: InferParams<P>): Promise<InferResult<P>> {
        return this.#TProvider.search(params);
    }
}