import "reflect-metadata";
import { IMock, It, Mock, Times } from "typemoq";
import { IAppSettings } from "../../InversifyExpressExample.Domain/Config/Interfaces/IAppSettings";
import { toPromiseResponse } from "../InversifyExpressExample.Tests.Utilities/PromiseUtilities";
import { TvShow } from "../../InversifyExpressExample.Models/TvShow";
import { IHttpClient } from "../../InversifyExpressExample.Repositories/Client/Interfaces/IHttpClient";
import { ITvShowMapper } from "../../InversifyExpressExample.Repositories/Mappers/Interfaces/ITvShowMapper";
import { IRecievedTvShow } from "../../InversifyExpressExample.Repositories/RecievedModels/IRecievedTvShow";
import { TVShowRepository } from "../../InversifyExpressExample.Repositories/TVShowRepository";

describe('TVShowRepository tests unit', () => {

    let _httpClient : IMock<IHttpClient>;
    let _appSettings : IMock<IAppSettings>;
    let _tvShowMapper: IMock<ITvShowMapper>;
    let _tvShowRepository: TVShowRepository;

    const getTvShow = () : IRecievedTvShow => {
        const recievedShow : IRecievedTvShow = {
            id: 132,
            url: 'asda',
            name: 'sadasd',
            type: 'asd',
            language: 'sdf',
            genres: [],
            status: 'sad',
            runtime: 12,
            premiered: 'asd',
            officialSite: 'safd',
            weight: 234,
            webChannel:'asd',
            summary: 'asd',
            updated: 12,
            _embedded: {
                episodes: [
                    {
                        id:12,
                        url:'asd',
                        name:'sadfs',
                        season:123,
                        number:123,
                        airdate:'asd',
                        airtime:'asd',
                        airstamp:new Date(),
                        runtime:12,
                        summary:'asd'
                    },
                    {
                        id:12,
                        url:'asd',
                        name:'sadfs',
                        season:123,
                        number:123,
                        airdate:'asd',
                        airtime:'asd',
                        airstamp:new Date(),
                        runtime:13,
                        summary:'asd'
                    }
                ]
            }
        }
        return recievedShow;
    }

    const setup = (setupFunctions) => {
        _httpClient = Mock.ofType<IHttpClient>();
        _appSettings = Mock.ofType<IAppSettings>();
        _tvShowMapper = Mock.ofType<ITvShowMapper>();
        setupFunctions();
        _tvShowRepository = new TVShowRepository(_httpClient.object, _appSettings.object, _tvShowMapper.object);
    }

    it('GetShowByName should call correct dependenices', async () => {
        //Arrange
        let setupFunctions = () => {
            _httpClient.setup(x => x.Get<IRecievedTvShow>(It.isAnyString())).returns(() => toPromiseResponse(getTvShow()));
            _appSettings.setup(x => x.SingleShowEndpoint).returns(() => "test endpoint");
            _tvShowMapper.setup(x => x.Map(It.isAny())).returns(() => new TvShow());
        }
        setup(setupFunctions);

        //Act
        await _tvShowRepository.GetShowByName('name');

        //Assert
        _httpClient.verify(x => x.Get<IRecievedTvShow>(It.isAnyString()), Times.once());
        _appSettings.verify(x => x.SingleShowEndpoint, Times.once());
        _tvShowMapper.verify(x => x.Map(It.isAny()), Times.once());
    })
})