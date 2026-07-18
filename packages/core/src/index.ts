import { SearchProvider, type InferParams, type InferResult } from "./provider";

interface SearchConfig<TProvider extends SearchProvider<any, any>> {
    provider: TProvider;
}

export class Search<
    P extends SearchProvider<any, any>,
> {
    /**
     * The SearchProvider instance that will be used to perform the search operations.
     */
    #TProvider: P;

    /**
     * Constructor to initialize the private variables of the Search class.
     * @param config - The configuration object containing the SearchProvider instance.
     */
    constructor(
        config: SearchConfig<P>
    ) {
        this.#TProvider = config.provider;
    }

    /**
     * Invokes the search operation using the configured SearchProvider.
     * @param params Provider agnostic search params
     * @returns Provider agnostic search results
     */
    invoke(params: InferParams<P>): Promise<InferResult<P>> {
        return this.#TProvider.search(params);
    }
}