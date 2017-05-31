import * as debug from 'debug';
let logger = debug("c52::controllers::CampaignController");
logger("logging for CampaignController");

import * as Express from "express";
import { CampaignBusiness } from "../app/business/CampaignBusiness";
import { IBaseController } from "./interfaces/base/IBaseController";
import { ICampaignModel } from "../app/model/interfaces/ICampaignModel";

export class CampaignController implements IBaseController<CampaignBusiness> {
    create(req: Express.Request, res: Express.Response): void {
        try {
            let campaign: ICampaignModel = <ICampaignModel>req.body;
            let campaignBusiness: CampaignBusiness = new CampaignBusiness();
            campaignBusiness.create(campaign, (error: any, result: any) => {
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
            let campaignBusiness: CampaignBusiness = new CampaignBusiness();
            campaignBusiness.update(_id, campaign, (error: any, result: any) => {
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
            let campaignBusiness: CampaignBusiness = new CampaignBusiness();
            campaignBusiness.delete(_id, (error: any, result: any) => {
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

    retrieve(req: Express.Request, res: Express.Response): void {
        logger("getting campaigns");
        try {
            let campaignBusiness: CampaignBusiness = new CampaignBusiness();
            campaignBusiness.retrieve((error: any, result: any) => {
                if (error) {
                    logger("retrieve::error:", error);
                    res.send({ "error": "error performing the requested action" });
                } else {
                    res.send(result);
                }
            });
        } catch (ex) {
            logger("retrieve exception:", ex);
            res.send({ "error": "error in your request" });
        }
    }

    findById(req: Express.Request, res: Express.Response): void {
        try {
            let _id: string = req.params._id;
            let campaignBusiness: CampaignBusiness = new CampaignBusiness();
            campaignBusiness.findById(_id, (error: any, result: any) => {
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