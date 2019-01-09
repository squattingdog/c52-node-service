
import debug from "debug";
let logger = debug("c52::routes::sfdc::sfdcRouter");
import { Router, Request, Response, NextFunction } from "express";
import SFDCProxy from "../../config/proxies/sfdc/SFDCProxy";
import { AppConfig } from "../settings/AppConfig";

export class SFDCRoutes {
    private router: Router;

    constructor() {
        this.router = Router();
        this.initV1Routes();
    }

    /*
     * public getter so the router object cannot be swapped
    */
    public get routes(): Router {
        logger("sfdc router: ", this.router);
        return this.router;
    }

    /*
     * Take each handler and attach to one of the Express.Router"s endpoints.
    */
    private initV1Routes() {
        this.router.get("/v1/", this.smokeTest.bind(this));
        this.router.get("/v1/accounts/:q", this.getAccount.bind(this));
    }

    /*
     * get list of accounts by query param.
    */
    public getAccount(req: Request, res: Response, next: NextFunction) {
        logger("\nrequest param q: %s\n", req.params.q);
        let routeUri = AppConfig.sfdcSoslUrl + "parameterizedSearch/?q=" + req.params.q + "&sobject=Account&Account.fields=id,name&Account.limit=10";
        let sfRequest = {
            method: "GET",
            uri: routeUri
        };

        SFDCProxy.send(sfRequest, (error: Error, prxyRes: Response, body: string) => {
            if (error) {
                logger(error);
                res.status(500).send(error);
            } else {
                logger("got the callback");
                res.send(JSON.parse(body));
            }
        });
    }

    public smokeTest(req: Request, res: Response, next: NextFunction) {
        res.json({
            message: "SFDC Router is online and ready for requests!!"
        });
    }
}

Object.seal(SFDCRoutes);

export default SFDCRoutes;