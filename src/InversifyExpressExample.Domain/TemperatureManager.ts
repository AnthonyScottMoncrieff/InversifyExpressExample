import { injectable } from "inversify";
import { ITemperatureManager } from "./Interfaces/ITemperatureManager";

@injectable()
export class TemperatureManager implements ITemperatureManager{

    FarenheitToCelcius(tempInFarenheit: number): number {
        let tempInCelcius = (tempInFarenheit - 32) * (5/9);
        return tempInCelcius;
    }
    CelciusToFarenheit(tempInCelcius: number): number {
        let tempInFarenheit = (tempInCelcius * (9/5)) + 32;
        return tempInFarenheit;
    }

}