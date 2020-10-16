export interface IDbClient{
    Find<T>(collection: string, filter: Object): Promise<T[]>;
    FindOneById<T>(collection: string, objectId: string): Promise<T>;
    Insert<T extends {_id:any}>(collection: string, model: T): Promise<T>;
    Update<T>(collection: string, objectId: string, model: T): Promise<void>;
    Remove(collection: string, objectId: string): Promise<void>;
}