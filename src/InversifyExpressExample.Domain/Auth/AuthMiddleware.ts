import { injectable } from "inversify";
import * as express from 'express';
import { BaseMiddleware } from "inversify-express-utils";

@injectable()
export class AuthMiddleware extends BaseMiddleware {
    public async handler(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        let isAuthenticated = await this.httpContext.user.isAuthenticated();
        if (isAuthenticated) {
            next();
        } else {
            return res.status(403).json({Err: "Error: Not signed in"});
        }
    }
}