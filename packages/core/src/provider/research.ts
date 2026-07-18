export interface ResearchProvider<TParams = unknown, TResult = unknown> {
  research(params: TParams): Promise<TResult>;
}
