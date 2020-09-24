import "reflect-metadata";
import { expect } from "chai";
import { IMock, It, Mock, Times } from "typemoq";
import { ITemperatureManager } from "../../InversifyExpressExample.Domain/Interfaces/ITemperatureManager";
import { TestController } from "../../InversifyExpressExample/Controllers/TemperatureController";

describe('TestController Tests', () => {

    let _temperatureManager: IMock<ITemperatureManager>;
    let _sut: TestController;

    const setup = (moqSetup) => {
        _temperatureManager = Mock.ofType<ITemperatureManager>();
        moqSetup();
        _sut = new TestController(_temperatureManager.object);
    }

    it('CelciusToFarenheit should call correct dependencies', async () => {
        //Arrange
        var farenheitResult = 5;
        let moqSetup = () =>{
            _temperatureManager.setup(x => x.CelciusToFarenheit(It.isAnyNumber())).returns(() => farenheitResult);
        };
        setup(moqSetup);

        //Act
        let response = _sut.CelciusToFarenheit(12);

        //Assert
        _temperatureManager.verify(x => x.CelciusToFarenheit(It.isAnyNumber()), Times.once());
        let content = await response.content.readAsStringAsync();
        expect(content).eq(farenheitResult.toString());
    })

    it('FarenheitToCelcius should call correct dependencies', async () => {
        //Arrange
        var farenheitResult = 5;
        let moqSetup = () =>{
            _temperatureManager.setup(x => x.FarenheitToCelcius(It.isAnyNumber())).returns(() => farenheitResult);
        };
        setup(moqSetup);

        //Act
        let response = _sut.FarenheitToCelcius(12);

        //Assert
        _temperatureManager.verify(x => x.FarenheitToCelcius(It.isAnyNumber()), Times.once());
        let content = await (await response.executeAsync()).content.readAsStringAsync();
        expect(content).eq(farenheitResult.toString());
    })
})