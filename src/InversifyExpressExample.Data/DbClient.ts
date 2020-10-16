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

    public async FindAsync<T>(collection: string, filter: Object): Promise<T[]> {
        let find = await this._db.collection(collection).find(filter).toArray();
        let idParsedFind: T[] = find.map(doc => { return {...doc, '_id': doc._id.toString() }})
        return idParsedFind;
    }

    public async FindOneByIdAsync<T>(collection: string, objectId: string): Promise<T> {
        let find = await this._db.collection(collection).find({ _id: new ObjectID(objectId) }).limit(1).toArray();
        let first : T = find.map(doc => { return {...doc, '_id': doc._id.toString() }})[0];
        return first;
    }

    public async InsertAsync<T>(collection: string, model: T): Promise<T> {
        let insert = await this._db.collection(collection).insertOne(model);
        return <T>insert.ops.map(doc => { return {...doc, '_id': doc._id.toString() }})[0];
    }

    public async UpdateAsync<T>(collection: string, objectId: string, model: T): Promise<void> {
        await this._db.collection(collection).updateOne({ _id: new ObjectID(objectId) }, { $set: model });
    }

    public async RemoveAsync(collection: string, objectId: string): Promise<void> {
        await this._db.collection(collection).deleteOne({ _id: new ObjectID(objectId) });
    }
}