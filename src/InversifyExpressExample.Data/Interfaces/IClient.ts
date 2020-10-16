export interface IClient{
    Find<T>(collection: string, filter: Object): Promise<T[]>;
}