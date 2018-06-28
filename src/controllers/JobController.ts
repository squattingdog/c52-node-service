import debug from "debug";
let logger = debug("c52::controllers::JobController");
logger("logging for JobController");

import * as Express from "express";
import { IBaseController } from "./interfaces/base/IBaseController";
import { IJobService } from "../data/service/interfaces/IJobService";
import { IJobModel } from "../data/model/interfaces/IJobModel";
import { JobService } from "../data/service/JobService";
import { JobModel } from "../data/model/JobModel";

export class JobController implements IBaseController<IJobService> {
    create(req: Express.Request, res: Express.Response): void {
        try {
            let job: IJobModel = <IJobModel>req.body;
            let jobService: JobService = new JobService();
            jobService.create(job, (error: any, result: any) => {
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
            let job: IJobModel = <IJobModel>req.body;
            let _id: string = req.params._id;
            let jobService: JobService = new JobService();
            jobService.update(_id, job, (error: any, result: any) => {
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
            let jobService: JobService = new JobService();
            jobService.delete(_id, (error: any, result: any) => {
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

    retrieve(req: Express.Request, res: Express.Response, next: Express.NextFunction): void {
        logger("getting campaigns");
        try {
            let jobService: JobService = new JobService();
            jobService.retrieve((error: any, result: JobModel[]) => {
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
            let jobService: JobService = new JobService();
            jobService.findById(_id, (error: any, result: any) => {
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

    retrieveByCampaignId(req: Express.Request, res: Express.Response): void {
        logger(`in the controller`);
        try {
            let campaignId = req.params.campaignId;
            logger(`campaignId: ${campaignId}`);
            let jobService: JobService = new JobService();
            jobService.findByCampaignId(campaignId, (error: any, result: any) => {
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