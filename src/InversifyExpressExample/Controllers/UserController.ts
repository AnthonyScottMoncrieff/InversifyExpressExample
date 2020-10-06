import * as express from "express";
import { controller, httpGet, queryParam, BaseHttpController, requestParam, interfaces } from "inversify-express-utils";
import { inject } from "inversify";
import { Symbols } from "../../InversifyExpressExample.Models/Symbols";

@controller("/users", )
export class UserController extends BaseHttpController {

    @httpGet("/:Id")
    public async GetShow(@requestParam("Id") Id: string): Promise<interfaces.IHttpActionResult> {
        let isAuthenticated = await this.httpContext.user.isAuthenticated();
        if (isAuthenticated) {
            let user = {Id, Name: 'Tester'};
            return this.ok(user);
        } else {
            return this.badRequest("No");
        }
        
    }
}
