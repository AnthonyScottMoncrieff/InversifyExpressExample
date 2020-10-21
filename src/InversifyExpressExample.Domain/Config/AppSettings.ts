import { injectable } from "inversify";
import { IAppSettings } from "./Interfaces/IAppSettings";

@injectable()
export class AppSettings implements IAppSettings{
    public readonly SingleShowEndpoint: string;
    public readonly ConnectionString : string;

    public constructor(configuration: any){
        this.SingleShowEndpoint = configuration.TVShows.SingleShowEndpoint;
        this.ConnectionString = configuration.Database.ConnectionString;
    }
}