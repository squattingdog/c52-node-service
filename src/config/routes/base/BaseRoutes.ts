import debug from "debug";
let logger = debug("c52::config::routes::base::BaseRouter");
logger("logging for BaseRouter");

import * as Express from "express";
import { CampaignRoutes } from "../CampaignRoutes";
import { SFDCRoutes } from "../SFDCRoutes";

export class BaseRoutes {

    constructor() { }

    static configure(app: Express.Application): void {
        app.use("/api/", new CampaignRoutes().routes);
        app.use("/api/sfdc", new SFDCRoutes().routes);
        app.use("/", BaseRoutes.defaultRoute);
    }

    private static get defaultRoute(): Express.Router {
        /* this is just to get up and running, and to make sure what we"ve got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = Express.Router();
        // placeholder route handler
        router.get("/", (req, res, next) => {
            res.json({
                message: "I am online!!"
            }).status(200);
        });

        return router;
    }
}

export default BaseRoutes;