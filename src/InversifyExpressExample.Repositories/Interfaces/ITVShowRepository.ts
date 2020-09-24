import { TvShow } from "../../InversifyExpressExample.Models/TvShow";

export interface ITVShowRepository{
    GetShowByName(name:string):Promise<TvShow>;
}