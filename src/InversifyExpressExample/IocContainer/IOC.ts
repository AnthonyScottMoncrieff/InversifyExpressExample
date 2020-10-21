import "reflect-metadata";
import { Container } from "inversify";
import { ExceptionlessClient } from "exceptionless";
import * as appSettings from '../Settings/AppSettings.json'
import { ILogger } from "../../InversifyExpressExample.Logging/Interfaces/ILogger";
import { Logger } from "../../InversifyExpressExample.Logging/Logger";
import { Symbols } from "../../InversifyExpressExample.Models/Symbols";
import { TemperatureManager } from "../../InversifyExpressExample.Domain/TemperatureManager";
import { ITemperatureManager } from "../../InversifyExpressExample.Domain/Interfaces/ITemperatureManager";
import { IHttpClient } from "../../InversifyExpressExample.Repositories/Client/Interfaces/IHttpClient";
import { HttpClient } from "../../InversifyExpressExample.Repositories/Client/HttpClient";
import { ITVShowRepository } from "../../InversifyExpressExample.Repositories/Interfaces/ITVShowRepository";
import { TVShowRepository } from "../../InversifyExpressExample.Repositories/TVShowRepository";
import { IAppSettings } from "../../InversifyExpressExample.Domain/Config/Interfaces/IAppSettings";
import { AppSettings } from "../../InversifyExpressExample.Domain/Config/AppSettings";
import { ITvShowMapper } from "../../InversifyExpressExample.Repositories/Mappers/Interfaces/ITvShowMapper";
import { TvShowMapper } from "../../InversifyExpressExample.Repositories/Mappers/TvShowMapper";
import { AuthMiddleware } from "../../InversifyExpressExample.Domain/Auth/AuthMiddleware";
import { DbConnection } from "../../InversifyExpressExample.Data/DbConnection";
import { IDbConnection } from "../../InversifyExpressExample.Data/Interfaces/IDbConnection";
import { DbClient } from "../../InversifyExpressExample.Data/DbClient";
import { IDbClient } from "../../InversifyExpressExample.Data/Interfaces/IDbClient";
import { IUserRepository } from "../../InversifyExpressExample.Repositories/Interfaces/IUserRepository";
import { UserRepository } from "../../InversifyExpressExample.Repositories/UserRepository";
import { Calendar } from "../../InversifyExpressExample.Domain/Calendar";
import { ICalendar } from "../../InversifyExpressExample.Domain/Interfaces/ICalendar";


export class IOC {
    private _container: Container;

    public GetInstance() {
        if (this._container != null)
            return this._container;
        let container = new Container();

        container.bind<IAppSettings>(Symbols.AppSettings).toConstantValue(new AppSettings(appSettings));
        container.bind<ITemperatureManager>(Symbols.TemperatureManager).to(TemperatureManager);
        container.bind<IHttpClient>(Symbols.HttpClient).to(HttpClient);
        container.bind<ITVShowRepository>(Symbols.TVShowRepository).to(TVShowRepository);
        container.bind<ITvShowMapper>(Symbols.TvShowMapper).to(TvShowMapper);
        container.bind<AuthMiddleware>(Symbols.AuthMiddleware).to(AuthMiddleware);
        container.bind<IDbConnection>(Symbols.DbConnection).to(DbConnection).inSingletonScope();
        container.bind<IDbClient>(Symbols.DbClient).to(DbClient);
        container.bind<IUserRepository>(Symbols.UserRepository).to(UserRepository);
        container.bind<ICalendar>(Symbols.Calendar).to(Calendar);

        this.ConfigureExceptionless(container);
        
        this._container = container;
        return container;
    }

    private ConfigureExceptionless(container: Container): void {
        let client = new ExceptionlessClient({
            apiKey: appSettings.Exceptionless.ApiKey,
            serverUrl: appSettings.Exceptionless.ServerUrl,
            submissionBatchSize: 100
        });
        container.bind<ILogger>(Symbols.Logger).toDynamicValue(() => new Logger(client)).inRequestScope();
    }
}