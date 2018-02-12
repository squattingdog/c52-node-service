import * as Mongoose from "mongoose";

export interface IShiftModel extends Mongoose.Document {
    sfid: string;
    name: string;
    jobId: string;
    description: string;
    campaignId: string;
    shiftDate: string;
    shiftStartTime: string;
    shiftEndTime: string;
}