import * as Mongoose from "mongoose";
import { IShiftModel } from "./IShiftModel";

export interface IJobModel extends Mongoose.Document {
    sfid: string;
    name: string;
    description: string;
    campaignId: string;
    shifts: IShiftModel;
}