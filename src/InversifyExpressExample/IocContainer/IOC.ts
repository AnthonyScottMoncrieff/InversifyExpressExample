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
        container.bind<ILogger>(Symbols.Logger).toConstantValue(new Logger(client));
    }
}