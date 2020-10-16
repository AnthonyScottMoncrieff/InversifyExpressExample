import { inject, injectable } from 'inversify';
import { Db, MongoClient } from 'mongodb';
import { AppSettings } from '../InversifyExpressExample.Domain/Config/AppSettings';
import { Symbols } from '../InversifyExpressExample.Models/Symbols';
import { IConnection } from './Interfaces/IConnection';

@injectable()
export class Connection implements IConnection {

    private _appSettings:AppSettings;
    private _isConnected: boolean = false;
    private _db: Db;

    constructor(@inject(Symbols.AppSettings) appSettings: AppSettings){
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
        MongoClient.connect(this._appSettings.ConnectionString, (err, client) => {
            this._isConnected = true;
            return result(err, this._db);
        });
    }
}