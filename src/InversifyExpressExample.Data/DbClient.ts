import { Db, InsertOneWriteOpResult, ObjectID } from 'mongodb';
import { inject, injectable } from 'inversify';
import { DbConnection } from './DbConnection';
import { Symbols } from '../InversifyExpressExample.Models/Symbols';
import { IDbClient } from './Interfaces/IDbClient';

@injectable()
export class DbClient implements IDbClient {
    private _db: Db;

    constructor(@inject(Symbols.DbConnection) mongoConnection: DbConnection) {
        mongoConnection.getConnection((connection) => {
            this._db = connection;
        });
    }

    public async Find<T>(collection: string, filter: Object): Promise<T[]> {
        let find: T[] = await this._db.collection(collection).find(filter).toArray();
        return find;
    }

    public async FindOneById<T>(collection: string, objectId: string): Promise<T> {
        let find: T[] = await this._db.collection(collection).find({ _id: new ObjectID(objectId) }).limit(1).toArray();
        let first = find[0];
        return first;
    }

    public async Insert<T extends { _id: any }>(collection: string, model: T): Promise<T> {
        let insert: InsertOneWriteOpResult<T> = await this._db.collection(collection).insertOne(model);
        return insert.ops[0];
    }

    public async Update<T>(collection: string, objectId: string, model: T): Promise<void> {
        await this._db.collection(collection).updateOne({ _id: new ObjectID(objectId) }, { $set: model });
    }

    public async Remove(collection: string, objectId: string): Promise<void> {
        await this._db.collection(collection).deleteOne({ _id: new ObjectID(objectId) });
    }
}