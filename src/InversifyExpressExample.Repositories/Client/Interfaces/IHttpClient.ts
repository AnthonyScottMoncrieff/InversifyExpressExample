export interface IHttpClient{
    Get<T>(url:string):Promise<T>;
}