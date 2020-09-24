import Axios from "axios";
import { IHttpClient } from "./Interfaces/IHttpClient";

export class HttpClient implements IHttpClient{
    public async Get<T>(url : string) : Promise<T>{
        let axiosResponse = await Axios.get(url);
        let response = await axiosResponse.data;
        return <T>response;
    }
}