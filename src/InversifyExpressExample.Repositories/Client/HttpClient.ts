import Axios from "axios";
import { injectable } from "inversify";
import { IHttpClient } from "./Interfaces/IHttpClient";

@injectable()
export class HttpClient implements IHttpClient{
    public async Get<T>(url : string) : Promise<T>{
        let axiosResponse = await Axios.get(url);
        let response = await axiosResponse.data;
        return <T>response;
    }
}