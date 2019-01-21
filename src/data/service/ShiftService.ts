import { ShiftModel } from "./../model/ShiftModel";
import { ShiftRepository } from "./../repository/ShiftRepository";
import { IShiftService } from "./interfaces/IShiftService";
import { IShiftModel } from "../model/interfaces/IShiftModel";
import { Optional } from "../../../typings/globals";


export class ShiftService implements IShiftService {
    private shiftRepository: ShiftRepository;

    constructor() {
        this.shiftRepository = new ShiftRepository();
    }

    public retrieve(callback: (error: any, result: ShiftModel[]) => void) {
        this.shiftRepository.retrieve((err: any, res: ShiftModel[]) => {
            let shifts: ShiftModel[] = new Array();
            if (err) {
                console.log(`retrieve error:\n${err}`);
            } else {
                res.forEach(s => {
                    shifts.push(new ShiftModel(
                        s.name
                        , s.shiftId
                        , s.jobId
                        , s.description
                        , s.startDateTime
                        , s.duration
                        , s.active
                        , s.numberOfVolunteersStillNeeded
                        , s.desiredNumberOfVolunteers
                        , s.totalVolunteers
                        , s.location
                    ));
                });
            }
            callback(err, shifts);
        });
    }
    findById(id: string, callback: (error: any, result: Optional<ShiftModel>) => void) {
        this.shiftRepository.findById(id, (err: any, s: IShiftModel) => {
            let shift: Optional<ShiftModel> = undefined;
            if (err) {
                console.log(`retrieve by id error: ${err}`);
            } else {
                shift = new ShiftModel(
                    s.name
                    , s.shiftId
                    , s.jobId
                    , s.description
                    , s.startDateTime
                    , s.duration
                    , s.active
                    , s.numberOfVolunteersStillNeeded
                    , s.desiredNumberOfVolunteers
                    , s.totalVolunteers
                    , s.location
                );
            }
            callback(err, shift);
        });
    }

    findByJobId(jobId: string, callback: (error: any, result: ShiftModel[]) => void) {
        this.shiftRepository.getShiftsByJobId(jobId, (err: any, res: IShiftModel[]) => {
            let shifts: ShiftModel[] = new Array();
            if (err) {
                console.log(err);
            } else {
                res.forEach(s => {
                    shifts.push(new ShiftModel(
                        s.name
                        , s.shiftId
                        , s.jobId
                        , s.description
                        , s.startDateTime
                        , s.duration
                        , s.active
                        , s.numberOfVolunteersStillNeeded
                        , s.desiredNumberOfVolunteers
                        , s.totalVolunteers
                        , s.location
                    ));
                });
            }
            callback(err, shifts);
        });
    }

    create(item: ShiftModel, callback: (error: any, result: any) => void) {
        throw new Error("do not implement.  Cmapaigns should not be updated.");
    }

    update(_id: string, item: ShiftModel, callback: (error: any, result: any) => void) {
        throw new Error("do not implement.  Cmapaigns should not be updated.");
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        throw new Error("do not implement.  Cmapaigns should not be updated.");
    }
}