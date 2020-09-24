import { IEmbedded } from "./IEmbedded";

export interface IRecievedTvShow {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number;
    premiered: string;
    officialSite: string;
    weight: number;
    webChannel?: any;
    summary: string;
    updated: number;
    _embedded: IEmbedded;
}