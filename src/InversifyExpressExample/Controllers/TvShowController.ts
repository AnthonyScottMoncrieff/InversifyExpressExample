import { controller, httpGet, queryParam, BaseHttpController, requestParam, interfaces } from "inversify-express-utils";
import { inject } from "inversify";
import { Symbols } from "../../InversifyExpressExample.Models/Symbols";
import { ITVShowRepository } from "../../InversifyExpressExample.Repositories/Interfaces/ITVShowRepository";

@controller("/tvshows")
export class TvShowController extends BaseHttpController {

    private readonly _tvShowRepository: ITVShowRepository; 

    constructor( @inject(Symbols.TVShowRepository) tvShowRepository: ITVShowRepository ) {
        super();
        this._tvShowRepository = tvShowRepository;
    }

    @httpGet("/:name")
    public async GetShow(@requestParam("name") name: string): Promise<interfaces.IHttpActionResult> {
        let show = await this._tvShowRepository.GetShowByName(name);
        return this.ok(show);
    }
}
