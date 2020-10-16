import { User } from "../../InversifyExpressExample.Models/User";

export interface IUserRepository{
    AddUserAsync(user:User): Promise<User>;
    GetUsersAsync(): Promise<User[]>;
    GetUserAsync(id: string): Promise<User>;
    UpdateUserAsync(id: string, user: User): Promise<void>;
    DeleteUserAsync(id: string): Promise<void>;
}