import debug from "debug";
let logger = debug("c52:routes:sfdc:sfdcInboundRouter");
import * as Express from "express";
import { AppConfig } from "../../config/settings/AppConfig";
import SFDCProxy from "../../config/proxies/sfdc/SFDCProxy";
import Request from "request";

/*
 * Inbound routes that SFDC will use to trigger updates to mongoDB data
*/
export class SFDCInboundRouter {
    private router: Express.Router;
    private sfdcRoutes: any;

    constructor() {
        this.router = Express.Router();
        this.sfdcRoutes = require("./routes.json");

        this.init();
    }

    /*
     * public getter so the router object cannot be swapped
    */
    public getRouter(): Express.Router {
        return this.router;
    }

    /*
     * Take each handler and attach to one of the Express.Router"s endpoints.
    */
    private init() {
        this.router.get("/", this.smokeTest.bind(this));
        this.router.get("/campaigns/volunteer", this.updateVolunteerCampaigns.bind(this));
    }

    /*
     * Route used to update volunteer job data
    */
    public updateVolunteerCampaigns(req: Express.Request, res: Express.Response, next: Express.NextFunction): void {
        logger("\nUpdate Volunteer Campaigns");
        let routeUri = AppConfig.sfdcApexRestUrl + this.sfdcRoutes.Campaigns.VolunteerCampaigns;
        logger("route:", routeUri);
        let sfRequest = {
            method: "GET",
            uri: routeUri
        };

        SFDCProxy.send(sfRequest, (error: any, prxyRes: Request.Response, body: any) => {
            if (error) {
                logger(error);
                res.status(500).send(prxyRes);
            } else {
                res.send(JSON.parse(body));
            }
        });
    }

    /*
     * smoketest route used to check handlers are online
    */
    public smokeTest(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
        res.json({
            message: "SFDC Inbound Router is online and ready for requests!!"
        });
    }
}

export default new SFDCInboundRouter();