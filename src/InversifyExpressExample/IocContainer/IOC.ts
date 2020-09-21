import "reflect-metadata";
import { Container } from "inversify";
import { ExceptionlessClient } from "exceptionless";
import * as appSettings from '../Settings/AppSettings.json'
import { ILogger } from "../../InversifyExpressExample.Logging/Interfaces/ILogger";
import { Logger } from "../../InversifyExpressExample.Logging/Logger";
import { Symbols } from "../../InversifyExpressExample.Models/Symbols";
import { TemperatureManager } from "../../InversifyExpressExample.Domain/TemperatureManager";
import { ITemperatureManager } from "../../InversifyExpressExample.Domain/Interfaces/ITemperatureManager";


export class IOC {
    private _container: Container;

    public GetInstance() {
        if (this._container != null)
            return this._container;
        let container = new Container();

        container.bind<ITemperatureManager>(Symbols.TemperatureManager).to(TemperatureManager);

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