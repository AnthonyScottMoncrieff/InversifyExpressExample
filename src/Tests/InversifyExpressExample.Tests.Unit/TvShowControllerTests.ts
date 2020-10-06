import { IMock, It, Mock, Times } from "typemoq";
import { TvShow } from "../../InversifyExpressExample.Models/TvShow";
import { ITVShowRepository } from "../../InversifyExpressExample.Repositories/Interfaces/ITVShowRepository";
import { TvShowController } from "../../InversifyExpressExample/Controllers/TvShowController";
import { toPromiseResponse } from "../InversifyExpressExample.Tests.Utilities/PromiseUtilities";
import "reflect-metadata";

describe('TvShowController tests', () => {


    let _repository : IMock<ITVShowRepository>;
    let _tvShowController : TvShowController;

    const setup = () => {
        _repository = Mock.ofType<ITVShowRepository>();
        _repository.setup(x => x.GetShowByName(It.isAnyString())).returns(() => toPromiseResponse(new TvShow()));
        _tvShowController = new TvShowController(_repository.object);
    };

    it('GetShow should call correct dependencies', async () => {
        //Arrange
        setup();

        //Act
        await _tvShowController.GetShow('test');

        //Assert
        _repository.verify(x => x.GetShowByName(It.isAnyString()), Times.once());
    })
})