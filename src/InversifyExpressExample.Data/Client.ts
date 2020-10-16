import { Db, InsertOneWriteOpResult, ObjectID } from 'mongodb';
import { inject, injectable } from 'inversify';
import { Connection } from './connection';
import { Symbols } from '../InversifyExpressExample.Models/Symbols';
import { IClient } from './Interfaces/IClient';

@injectable()
export class Client implements IClient {
    private _db: Db;

    constructor(@inject(Symbols.Connection) mongoConnection: Connection) {
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

    public async Insert<T extends {_id:any}>(collection: string, model: T): Promise<T> {
        let insert:InsertOneWriteOpResult<T> = await this._db.collection(collection).insertOne(model);
        return insert.ops[0];
      }
}