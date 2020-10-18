import { inject, injectable } from 'inversify';
import { Db, MongoClient } from 'mongodb';
import { AppSettings } from '../InversifyExpressExample.Domain/Config/AppSettings';
import { Symbols } from '../InversifyExpressExample.Models/Symbols';
import { IDbConnection } from './Interfaces/IDbConnection';

@injectable()
export class DbConnection implements IDbConnection {

    private _appSettings: AppSettings;
    private _isConnected: boolean = false;
    private _db: Db;
    private readonly _dbName: string = "testDb";

    constructor(@inject(Symbols.AppSettings) appSettings: AppSettings) {
        this._appSettings = appSettings;
    }

    public getConnection(result: (connection) => void): void {
        if (this._isConnected) {
            return result(this._db);
        } else {
            this.Connect((error, db: Db) => {
                return result(this._db);
            });
        }
    }

    private Connect(result: (error, db: Db) => void): void {
        MongoClient.connect(this._appSettings.ConnectionString, {
            useUnifiedTopology: true
        }, (err, client) => {
            this._isConnected = true;
            this._db = client.db(this._dbName);
            return result(err, this._db);
        });
    }
}