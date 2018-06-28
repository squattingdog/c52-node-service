import debug from "debug";
let logger = debug("c52::config::routes::CampaignRouter");
logger("logging for CampaignRouter");

import { Router } from "express";
import { CampaignController } from "../../controllers/CampaignController";

export class CampaignRoutes {
    private campaignController: CampaignController;
    private router: Router;

    constructor() {
        this.campaignController = new CampaignController();
        this.router = Router();
        this.initV1Routes();
    }

    get routes(): Router {
        return this.router;
    }

    private initV1Routes() {
        this.router.get("/v1/campaigns", this.campaignController.retrieve);
    }
}

Object.seal(CampaignRoutes);