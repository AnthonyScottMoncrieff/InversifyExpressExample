import { TvShow } from "../../InversifyExpressExample.Models/TvShow";
import { IRecievedTvShow } from "../RecievedModels/IRecievedTvShow";
import { ITvShowMapper } from "./Interfaces/ITvShowMapper";

export class TvShowMapper implements ITvShowMapper{

    Map(input: IRecievedTvShow): TvShow {
        var tvShow = new TvShow();
        tvShow.Name = input.name;
        tvShow.NumberOfEpisodes = input._embedded.episodes.length;
        tvShow.CombinedEpisodeRuntime = input._embedded.episodes.reduce((x,y) => x + y.runtime, 0);
        return tvShow;
    }

}