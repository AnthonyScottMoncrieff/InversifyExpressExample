import { TvShow } from "../../../InversifyExpressExample.Models/TvShow";
import { IRecievedTvShow } from "../../RecievedModels/IRecievedTvShow";

export interface ITvShowMapper{
    Map(input:IRecievedTvShow):TvShow;
}