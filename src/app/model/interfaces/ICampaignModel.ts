import * as Mongoose from "mongoose";

export interface ICampaignModel extends Mongoose.Document {
    sfid: string;
    name: string;
    logoUrl: string;
    description: string;
}