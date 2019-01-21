import * as Mongoose from "mongoose";
import { LocationModel } from "../LocationModel";

export interface IShiftModel extends Mongoose.Document {
    name: string;
    shiftId: string;
    jobId: string;
    description: string;
    startDateTime: Date;
    endDateTime: Date;
    duration: number;
    active: boolean;
    numberOfVolunteersStillNeeded: number;
    desiredNumberOfVolunteers: number;
    totalVolunteers: number;
    location: LocationModel;
}