import "reflect-metadata";
import { expect } from "chai";
import { TemperatureManager } from "../../InversifyExpressExample.Domain/TemperatureManager";

describe('TemperatureManager tests', () => {
    let manager : TemperatureManager;

    const setup = () => {
        manager = new TemperatureManager();
    }

    it('FarenheitToCelcius should convert correctly', () => {
        //Arrange
        setup();

        //Act
        let celcius = manager.FarenheitToCelcius(32);

        //Assert
        expect(celcius).eq(0);
    })

    it('CelciusToFarenheit should convert correctly', () => {
        //Arrange
        setup();

        //Act
        let celcius = manager.CelciusToFarenheit(0);

        //Assert
        expect(celcius).eq(32);
    })
})