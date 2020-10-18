import { inject } from "inversify";
import { controller, httpGet, BaseHttpController, requestParam, interfaces, httpPost, requestBody, httpPut } from "inversify-express-utils";
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

    @httpGet("/getuser/:Id", Symbols.AuthMiddleware)
    public async GetUser(@requestParam("Id") id: string): Promise<interfaces.IHttpActionResult> {
        let user = await this._userRepository.GetUserAsync(id);
        return this.ok(user);
    }

    @httpGet("/getall", Symbols.AuthMiddleware)
    public async GetAll(): Promise<interfaces.IHttpActionResult> {
        let users = await this._userRepository.GetUsersAsync();
        return this.ok(users);
    }

    @httpPost("/", Symbols.AuthMiddleware)
    public async SaveUser(@requestBody() user: User): Promise<interfaces.IHttpActionResult>{
        var response = await this._userRepository.AddUserAsync(user);
        return this.ok({"Response": `User with name ${user.Name} saved`});
    }

    @httpPut("/updateuser/:Id", Symbols.AuthMiddleware)
    public async UpdateUser(@requestBody() user: User, @requestParam("Id") id: string): Promise<interfaces.IHttpActionResult>{
        await this._userRepository.UpdateUserAsync(id, user);
        return this.ok({"Response": `User with name ${user.Name} updated`});
    }
}
