import { inject, injectable } from "inversify";
import { DbClient } from "../InversifyExpressExample.Data/DbClient";
import { Symbols } from "../InversifyExpressExample.Models/Symbols";
import { User } from "../InversifyExpressExample.Models/User";
import { IUserRepository } from "./Interfaces/IUserRepository";

@injectable()
export class UserRepository implements IUserRepository{

    private readonly _dbClient: DbClient;
    private readonly _documentName: string = "user";

    constructor(@inject(Symbols.DbClient) dbClient: DbClient){
        this._dbClient = dbClient;
    }

    public async AddUserAsync(user: User): Promise<User> {
        var response = await this._dbClient.InsertAsync<User>(this._documentName, user);
        return response;
    }
    public async GetUsersAsync(): Promise<User[]> {
        var response = await this._dbClient.FindAsync<User>(this._documentName, {});
        return response;
    }
    public async GetUserAsync(id: string): Promise<User> {
        var response = await this._dbClient.FindOneByIdAsync<User>(this._documentName, id);
        return response;
    }
    public async UpdateUserAsync(id: string, user: User): Promise<void> {
        await this._dbClient.UpdateAsync<User>(this._documentName, id, user);
    }
    public async DeleteUserAsync(id: string): Promise<void> {
        await this._dbClient.RemoveAsync(this._documentName, id);
    }

}