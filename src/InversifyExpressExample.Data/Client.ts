import { Db, ObjectID } from 'mongodb';
import { inject, injectable } from 'inversify';
import { Connection } from './connection';
import { Symbols } from '../InversifyExpressExample.Models/Symbols';
import { User } from '../InversifyExpressExample.Models/User';

@injectable()
export class MongoDBClient {
    public db: Db;

    constructor(@inject(Symbols.Connection) mongoConnection: Connection) {
        mongoConnection.getConnection((connection) => {
            this.db = connection;
        });
    }

    public async find<T>(collection: string, filter: Object): Promise<T[]> {
        let find = <T[]>(await this.db.collection(collection).find(filter).toArray());
        return find;
    }

    public findOneById(collection: string, objectId: string, result: (error, data) => void): void {
        this.db.collection(collection).find({ _id: new ObjectID(objectId) }).limit(1).toArray((error, find) => {
            return result(error, find[0]);
        });
    }
}