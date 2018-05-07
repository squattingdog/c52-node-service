import * as Debug from "debug";
let logger = Debug("c52::config::routes::CampaignRouter");
logger("logging for CampaignRouter");

import { Router, IRouterMatcher} from "express";
import { CampaignController } from "../../controllers/CampaignController";

export class CampaignRoutes {
    private campaignController: CampaignController;
    private router: Router;

    constructor() {
        this.campaignController = new CampaignController();
        this.router = Router();
        this.initRoutes();
    }

    get routes(): Router {
        return this.router;
    }

    private initRoutes() {
        this.router.get("/v1/campaigns", this.campaignController.retrieve);
    }
}

Object.seal(CampaignRoutes);