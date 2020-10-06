import { injectable, inject } from "inversify";
import { interfaces } from "inversify-express-utils";
import * as express from "express";
import { Principal } from "./Principal";

@injectable()
export class AuthProvider implements interfaces.AuthProvider {

    public async getUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<interfaces.Principal> {
        const token = req.headers["x-auth-token"];
        const principal = new Principal({isAuth:token !== undefined});
        return principal;
    }

}
