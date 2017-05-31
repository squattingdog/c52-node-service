import * as Debug from "debug";
let logger = Debug("c52::config::routes::CampaignRouter");
logger("logging for CampaignRouter");

import * as Express from "express";
import { CampaignController } from "../../controllers/CampaignController";

export class CampaignRoutes {
    private campaignController: CampaignController;

    constructor() {
        this.campaignController = new CampaignController();
    }

    get routes(): Express.Router {
        let router: Express.Router = Express.Router();

        router.get("/v1/campaigns", this.campaignController.retrieve);
        return router;
    }
}

Object.seal(CampaignRoutes);