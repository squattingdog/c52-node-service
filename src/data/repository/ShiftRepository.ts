import ShiftSchema from "./../dataAccess/schemas/ShiftSchema";
import { IShiftModel } from "./../model/interfaces/IShiftModel";
import { RepositoryBase } from "./base/RepositoryBase";


export class ShiftRepository extends RepositoryBase<IShiftModel> {
    constructor() {
        super(ShiftSchema);
    }

    getShiftsByJobId(jobId: string, callback: (error: any, result: IShiftModel[]) => void) {
        super.model.find({jobId: jobId}).sort({startDateTime: 1}).exec(callback);
    }
}

Object.seal(ShiftRepository);