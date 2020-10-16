export interface IClient{
    Find<T>(collection: string, filter: Object): Promise<T[]>;
    FindOneById<T>(collection: string, objectId: string): Promise<T>;
}