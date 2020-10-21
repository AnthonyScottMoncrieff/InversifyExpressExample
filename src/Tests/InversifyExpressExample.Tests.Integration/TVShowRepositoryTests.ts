import "reflect-metadata";
import { expect } from "chai";
import { Symbols } from "../../InversifyExpressExample.Models/Symbols";
import { ITVShowRepository } from "../../InversifyExpressExample.Repositories/Interfaces/ITVShowRepository";
import { IOC } from "../../InversifyExpressExample/IocContainer/IOC";

describe('TVShowRepository tests integration', () => {
    it('GetShowByName should successfully get show', async () => {
        //Arrange
        let ioc = new IOC();
        let container = ioc.GetInstance();
        let repository = container.get<ITVShowRepository>(Symbols.TVShowRepository);
        let showName = 'brooklyn-nine-nine';

        //Act
        let result = await repository.GetShowByName(showName);

        //Assert
        expect(result).is.not.null;
    })
})