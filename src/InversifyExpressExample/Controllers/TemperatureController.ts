import * as express from "express";
import { controller, httpGet, queryParam, BaseHttpController, requestParam, HttpResponseMessage, StringContent, interfaces } from "inversify-express-utils";
import { inject } from "inversify";
import { Symbols } from "../../InversifyExpressExample.Models/Symbols";
import { ITemperatureManager } from "../../InversifyExpressExample.Domain/Interfaces/ITemperatureManager";

@controller("/temperature")
export class TestController extends BaseHttpController {

    private readonly _temperatureManager: ITemperatureManager; 

    constructor( @inject(Symbols.TemperatureManager) temperatureManager: ITemperatureManager ) {
        super();
        this._temperatureManager = temperatureManager;
    }

    @httpGet("/CelciusToFarenheit/:celcius")
    public CelciusToFarenheit(@requestParam("celcius") celcius: number): HttpResponseMessage {
        let convertedValue = this._temperatureManager.CelciusToFarenheit(celcius);
        const response = new HttpResponseMessage(200);
        response.content = new StringContent(convertedValue.toString());
        return response;

    }

    @httpGet("/FarenheitToCelcius/:farenheit")
    public FarenheitToCelcius(@requestParam("farenheit") farenheit: number): interfaces.IHttpActionResult {
        let convertedValue = this._temperatureManager.FarenheitToCelcius(farenheit);
        const response = new HttpResponseMessage(200);
        response.content = new StringContent(convertedValue.toString());
        return this.ok(convertedValue.toString());
    }
}
