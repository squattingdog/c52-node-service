import * as debug from 'debug';
let logger = debug("c52::controllers::CampaignController");
logger("logging for CampaignController");

import * as Express from "express";
import { CampaignService } from "../data/service/CampaignService";
import { IBaseController } from "./interfaces/base/IBaseController";
import { CampaignModel } from '../data/model/CampaignModel';
import { ICampaignModel } from '../data/model/interfaces/ICampaignModel';

export class CampaignController implements IBaseController<CampaignService> {
    create(req: Express.Request, res: Express.Response): void {
        try {
            let campaign: ICampaignModel = <ICampaignModel>req.body;
            let campaignService: CampaignService = new CampaignService();
            campaignService.create(campaign, (error: any, result: any) => {
                if (error) {
                    logger("create::error", error);
                    res.send({ "error": "error performing the requested action" });
                } else {
                    res.send({ "success": "success" });
                }
            });
        } catch (ex) {
            logger("Create exception", ex);
            res.send({ "error": "error in your request" });
        }
    }

    update(req: Express.Request, res: Express.Response): void {
        try {
            let campaign: ICampaignModel = <ICampaignModel>req.body;
            let _id: string = req.params._id;
            let campaignService: CampaignService = new CampaignService();
            campaignService.update(_id, campaign, (error: any, result: any) => {
                if (error) {
                    logger("update::error", error);
                    res.send({ "error": "error performing the requested action" });
                } else {
                    res.send({ "success": "success" }); res.send(result);
                }
            });

        } catch (ex) {
            logger("update exception", ex);
            res.send({ "error": "error in your request" });
        }
    }

    delete(req: Express.Request, res: Express.Response): void {
        try {
            let _id: string = req.params._id;
            let campaignService: CampaignService = new CampaignService();
            campaignService.delete(_id, (error: any, result: any) => {
                if (error) {
                    logger.log("delete::error:", error);
                    res.send({ "error": "error performing the requested action" });
                } else {
                    res.send({ "success": "success" });
                }
            });
        } catch (ex) {
            logger("delete exception:", ex);
            res.send({ "error": "error in your request" });
        }
    }

    retrieve(req: Express.Request, res: Express.Response, next:Express.NextFunction): void {
        logger("getting campaigns");
        try {
            let campaignService: CampaignService = new CampaignService();
            campaignService.retrieve((error: any, result: CampaignModel[]) => {
                if (error) {
                    logger("retrieve::error:", error);
                    res.json({ "error": "error performing the requested action" });
                } else {
                    console.log("results: ");
                    console.log(result);
                    res.json(result);
                }
            });
        } catch (ex) {
            logger("retrieve exception:", ex);
            res.json({ "error": "error in your request" });
        }
        logger("nexting".red.bold);
    }

    findById(req: Express.Request, res: Express.Response): void {
        try {
            let _id: string = req.params._id;
            let campaignService: CampaignService = new CampaignService();
            campaignService.findById(_id, (error: any, result: any) => {
                if (error) {
                    logger("findById::error:", error);
                    res.send({ "error": "error performing the requested action" });
                } else {
                    res.send(result);
                }
            });
        } catch (ex) {
            logger("findById exception:", ex);
            res.send({ "error": "error in your request" });
        }
    }
}