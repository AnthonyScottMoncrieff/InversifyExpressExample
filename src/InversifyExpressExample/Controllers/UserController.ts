import { inject } from "inversify";
import { controller, httpGet, BaseHttpController, requestParam, interfaces, httpPost, requestBody } from "inversify-express-utils";
import { Symbols } from "../../InversifyExpressExample.Models/Symbols";
import { User } from "../../InversifyExpressExample.Models/User";
import { UserRepository } from "../../InversifyExpressExample.Repositories/UserRepository";

@controller("/users",)
export class UserController extends BaseHttpController {

    private readonly _userRepository: UserRepository;

    constructor(@inject(Symbols.UserRepository) userRepository: UserRepository){
        super();
        this._userRepository = userRepository;
    }

    @httpGet("/:Id", Symbols.AuthMiddleware)
    public async GetUser(@requestParam("Id") Id: number): Promise<interfaces.IHttpActionResult> {
        let user = { Name: 'Tester', Age: 12 } as User;
        return this.ok(user);
    }

    @httpPost("/", Symbols.AuthMiddleware)
    public async SaveUser(@requestBody() user: User): Promise<interfaces.IHttpActionResult>{
        var response = await this._userRepository.AddUserAsync(user);
        return this.ok({"Response": `User with name ${user.Name} saved`});
    }
}
