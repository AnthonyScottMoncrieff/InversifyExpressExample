export interface IDbClient{
    FindAsync<T>(collection: string, filter: Object): Promise<T[]>;
    FindOneByIdAsync<T>(collection: string, objectId: string): Promise<T>;
    InsertAsync<T extends {_id:any}>(collection: string, model: T): Promise<T>;
    UpdateAsync<T>(collection: string, objectId: string, model: T): Promise<void>;
    RemoveAsync(collection: string, objectId: string): Promise<void>;
}