import { injectable, inject } from "inversify";
import { interfaces } from "inversify-express-utils";
import * as express from "express";
import { Principal } from "./Principal";
import 'reflect-metadata';

@injectable()
export class AuthProvider implements interfaces.AuthProvider {

    //Typically you would inject an AuthService into here to determine whether a user is authorized

    public async getUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<interfaces.Principal> {
        const token = req.headers["x-auth-token"];
        const principal = new Principal({isAuth: token !== undefined});
        return principal;
    }

}
