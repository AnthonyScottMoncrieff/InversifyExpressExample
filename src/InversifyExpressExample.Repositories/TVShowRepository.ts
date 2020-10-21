import { inject, injectable } from "inversify";
import { Symbols } from "../InversifyExpressExample.Models/Symbols";
import { ITVShowRepository } from "./Interfaces/ITVShowRepository";
import { IRecievedTvShow } from "./RecievedModels/IRecievedTvShow";
import { IHttpClient } from './Client/Interfaces/IHttpClient';
import { IAppSettings } from "../InversifyExpressExample.Domain/Config/Interfaces/IAppSettings";
import { TvShow } from "../InversifyExpressExample.Models/TvShow";
import { ITvShowMapper } from "./Mappers/Interfaces/ITvShowMapper";
import 'reflect-metadata';

@injectable()
export class TVShowRepository implements ITVShowRepository{

    private readonly _httpClient : IHttpClient;
    private readonly _appSettings : IAppSettings;
    private readonly _tvShowMapper: ITvShowMapper;

    constructor(@inject(Symbols.HttpClient) httpClient : IHttpClient, @inject(Symbols.AppSettings) appSettings: IAppSettings, @inject(Symbols.TvShowMapper) tvShowMapper: ITvShowMapper) {
        this._httpClient = httpClient;
        this._appSettings = appSettings;
        this._tvShowMapper = tvShowMapper;
    }

    public async GetShowByName(name: string): Promise<TvShow> {
        let tvShowResponse = await this._httpClient.Get<IRecievedTvShow>(`${this._appSettings.SingleShowEndpoint}${name}`);
        let mappedShow = this._tvShowMapper.Map(tvShowResponse);
        return mappedShow;
    }

}