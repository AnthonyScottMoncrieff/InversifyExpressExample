export interface ITemperatureManager{
    FarenheitToCelcius(tempInFarenheit : number) : number;
    CelciusToFarenheit(tempInFarenheit : number) : number;
}