import { ShiftService } from "./../data/service/ShiftService";
import { IShiftService } from "./../data/service/interfaces/IShiftService";
import { IBaseController } from "./interfaces/base/IBaseController";
import * as Express from "express";
import { Optional } from "../../typings/globals";
import { ShiftModel } from "../data/model/ShiftModel";
import { IShiftModel } from "../data/model/interfaces/IShiftModel";

export class ShiftController implements IBaseController<IShiftService> {

    retrieve(req: Express.Request, res: Express.Response, next: Express.NextFunction): void {
        try {
            let shiftService: ShiftService = new ShiftService();
            shiftService.retrieve((error: any, result: ShiftModel[]) => {
                if (error) {
                    res.json({ "error": "error performing the requested action."});
                } else {
                    res.json(result);
                }
            });
        } catch (err) {
            res.send({ "error": "error in the request."});
        }
    }

    findById(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
        try {
            let _id: string = req.params._id;
            let shiftService: ShiftService = new ShiftService();
            shiftService.findById(_id, (error: any, result: Optional<ShiftModel>) => {
                if (error) {
                    res.send({ "error": "error performing the requested action."});
                } else {
                    res.send(result);
                }
            });
        } catch (err) {
            res.send({ "error": "error in the request."});
        }
    }

    findByShiftId(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
        try {
            let jobId: string = req.params.jobId;
            let shiftService: ShiftService = new ShiftService();
            shiftService.findByJobId(jobId, (error: any, result: ShiftModel[]) => {
                if (error) {
                    res.send({ "error": "error performing the requested action."});
                } else {
                    res.send(result);
                }
            });
        } catch (err) {
            res.send({ "error": "error in the request."});
        }
    }

    create(req: Express.Request, res: Express.Response): void {
        try {
            let job: IShiftModel = <IShiftModel>req.body;
            let shiftService: ShiftService = new ShiftService();
            shiftService.create(job, (error: any, result: any) => {
                if (error) {
                    res.send({ "error": "error performing the requested action" });
                } else {
                    res.send({ "success": "success" });
                }
            });
        } catch (ex) {
            console.log(ex);
            res.send({ "error": "error in your request" });
        }
    }

    update(req: Express.Request, res: Express.Response): void {
        try {
            let job: IShiftModel = <IShiftModel>req.body;
            let _id: string = req.params._id;
            let shiftService: ShiftService = new ShiftService();
            shiftService.update(_id, job, (error: any, result: any) => {
                if (error) {
                    console.log("update::error", error);
                    res.send({ "error": "error performing the requested action" });
                } else {
                    res.send({ "success": "success" }); res.send(result);
                }
            });

        } catch (ex) {
            console.log("update exception", ex);
            res.send({ "error": "error in your request" });
        }
    }

    delete(req: Express.Request, res: Express.Response): void {
        try {
            let _id: string = req.params._id;
            let shiftService: ShiftService = new ShiftService();
            shiftService.delete(_id, (error: any, result: any) => {
                if (error) {
                    console.log("delete::error:", error);
                    res.send({ "error": "error performing the requested action" });
                } else {
                    res.send({ "success": "success" });
                }
            });
        } catch (ex) {
            console.log("delete exception:", ex);
            res.send({ "error": "error in your request" });
        }
    }
}