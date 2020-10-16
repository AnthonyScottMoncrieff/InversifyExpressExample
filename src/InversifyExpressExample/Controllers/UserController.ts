import { controller, httpGet, BaseHttpController, requestParam, interfaces, httpPost, requestBody } from "inversify-express-utils";
import { Symbols } from "../../InversifyExpressExample.Models/Symbols";
import { User } from "../../InversifyExpressExample.Models/User";

@controller("/users",)
export class UserController extends BaseHttpController {

    @httpGet("/:Id", Symbols.AuthMiddleware)
    public async GetUser(@requestParam("Id") Id: number): Promise<interfaces.IHttpActionResult> {
        let user = { Name: 'Tester', Age: 12 } as User;
        return this.ok(user);
    }

    @httpPost("/", Symbols.AuthMiddleware)
    public async SaveUser(@requestBody() user: User): Promise<interfaces.IHttpActionResult>{
        return this.ok({"Response": `User with name ${user.Name} saved`});
    }
}
