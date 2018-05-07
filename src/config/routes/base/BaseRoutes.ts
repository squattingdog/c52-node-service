import * as Debug from "debug";
let logger = Debug("c52::config::routes::base::BaseRouter");
logger("logging for BaseRouter");

import * as Express from "express";
import { CampaignRoutes } from "../CampaignRoutes";
import { SFDCRoutes } from "../SFDCRoutes";

export class BaseRoutes {

    constructor(private app: Express.Application) { }

    setRoutes():void {
        let router:Express.Router = Express.Router();
        this.app.use("/api/", new CampaignRoutes().routes);
        this.app.use("/api/", new SFDCRoutes().routes);
        this.app.use("/", this.defaultRoute);
    }

    private get defaultRoute(): Express.Router {
        /* this is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = Express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
                message: 'I am online!!'
            });
            next();
        });

        return router;
    }
}

export default BaseRoutes;