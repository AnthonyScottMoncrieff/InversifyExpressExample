import "reflect-metadata";
import { expect } from "chai"
import { TvShowMapper } from "../../InversifyExpressExample.Repositories/Mappers/TvShowMapper"
import { IRecievedTvShow } from "../../InversifyExpressExample.Repositories/RecievedModels/IRecievedTvShow"

describe('TvShowMapper Tests', () => {

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

    it('Map should map correctly', () => {
        //Arrange
        let show = getTvShow();
        let mapper = new TvShowMapper();

        //Act
        let response = mapper.Map(show);

        //Assert
        expect(response.Name).eq(show.name);
        expect(response.NumberOfEpisodes).eq(show._embedded.episodes.length);
        expect(response.CombinedEpisodeRuntimeMinutes).eq(show._embedded.episodes.reduce((x,y) => x + y.runtime, 0));
    })
})