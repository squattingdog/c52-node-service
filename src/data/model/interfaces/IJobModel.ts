import * as Mongoose from "mongoose";

export interface IJobModel extends Mongoose.Document {
    jobId: string;
    name: string;
    description: string;
    skills: string;
    ongoing: boolean;
    numberOfVolunteersStillNeeded: number;
    nubmerOfShifts: number;
    active: boolean;
    location: {
        zip: string,
        street: string,
        city: string,
        state: null,
        informataion: string,
        geocode: number
    };
    campaignId: string;
    displayOnWebsite: boolean;
}