import { controller, httpGet, BaseHttpController, requestParam, interfaces } from "inversify-express-utils";
import { Symbols } from "../../InversifyExpressExample.Models/Symbols";

@controller("/users",)
export class UserController extends BaseHttpController {

    @httpGet("/:Id", Symbols.AuthMiddleware)
    public async GetShow(@requestParam("Id") Id: string): Promise<interfaces.IHttpActionResult> {
        let user = { Id, Name: 'Tester' };
        return this.ok(user);
    }
}
