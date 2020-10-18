export interface IDbClient{
    FindAsync<T extends {_id:string}>(collection: string, filter: Object): Promise<T[]>;
    FindOneByIdAsync<T extends {_id:string}>(collection: string, objectId: string): Promise<T>;
    InsertAsync<T extends {_id:string}>(collection: string, model: T): Promise<T>;
    UpdateAsync<T extends {_id:string}>(collection: string, objectId: string, model: T): Promise<void>;
    RemoveAsync(collection: string, objectId: string): Promise<void>;
}