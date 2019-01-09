import * as Mongoose from "mongoose";

export interface ICampaignModel extends Mongoose.Document {
    mid: string;
    name: string;
    logoUrl: string;
    description: string;
    campaignId: string;
}