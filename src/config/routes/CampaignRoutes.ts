import debug from "debug";
let logger = debug("c52::config::routes::CampaignRouter");
logger("logging for CampaignRouter");

import { Router } from "express";
import { CampaignController } from "../../controllers/CampaignController";
import { JobController } from "../../controllers/JobController";
import { CampaignService } from "../../data/service/CampaignService";
import { CampaignRepository } from "../../data/repository/CampaignRepository";

export class CampaignRoutes {
    private campaignController: CampaignController;
    private jobController: JobController;
    private router: Router;

    constructor() {
        this.campaignController = new CampaignController(new CampaignService(new CampaignRepository));
        this.jobController = new JobController();
        this.router = Router();
        this.initV1Routes();
    }

    get routes(): Router {
        return this.router;
    }

    private initV1Routes() {
        this.router.get("/v1/campaigns", this.campaignController.retrieve);
        this.router.get("/v1/campaign/:campaignId/jobs", this.jobController.retrieveByCampaignId);
    }
}

Object.seal(CampaignRoutes);