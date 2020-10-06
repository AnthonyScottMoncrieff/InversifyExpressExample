import { controller, httpGet, BaseHttpController, requestParam, interfaces } from "inversify-express-utils";

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
