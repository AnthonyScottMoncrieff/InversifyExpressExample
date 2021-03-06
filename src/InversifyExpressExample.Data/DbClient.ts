import { Db, ObjectID } from 'mongodb';
import { inject, injectable } from 'inversify';
import { DbConnection } from './DbConnection';
import { Symbols } from '../InversifyExpressExample.Models/Symbols';
import { IDbClient } from './Interfaces/IDbClient';

@injectable()
export class DbClient implements IDbClient {
    private _db: Db;

    constructor(@inject(Symbols.DbConnection) mongoConnection: DbConnection) {
        mongoConnection.GetConnection((connection) => {
            this._db = connection;
        });
    }

    public async FindAsync<T extends {_id:string}>(collection: string, filter: Object): Promise<T[]> {
        let find: T[] = await this._db.collection(collection).find(filter).toArray();
        return find;
    }

    public async FindOneByIdAsync<T extends {_id:string}>(collection: string, objectId: string): Promise<T> {
        let find = await this._db.collection(collection).find({ _id: new ObjectID(objectId) }).next();
        return <T>find;
    }

    public async InsertAsync<T extends {_id:string}>(collection: string, model: T): Promise<T> {
        let insert = await this._db.collection(collection).insertOne(model);
        return <T>insert.ops[0];
    }

    public async UpdateAsync<T extends {_id:string}>(collection: string, objectId: string, model: T): Promise<void> {
        await this._db.collection(collection).updateOne({ _id: new ObjectID(objectId) }, { $set: model });
    }

    public async RemoveAsync(collection: string, objectId: string): Promise<void> {
        await this._db.collection(collection).deleteOne({ _id: new ObjectID(objectId) });
    }
}