import * as Mongoose from "mongoose";
import { LocationModel } from "../LocationModel";

export interface IJobModel extends Mongoose.Document {
    jobId: string;
    name: string;
    description: string;
    skills: string;
    ongoing: boolean;
    numberOfVolunteersStillNeeded: number;
    nubmerOfShifts: number;
    active: boolean;
    location: LocationModel;
    campaignId: string;
    displayOnWebsite: boolean;
}