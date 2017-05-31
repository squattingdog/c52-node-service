import DataAccess from "../DataAccess";
import { ICampaignModel } from "../../model/interfaces/ICampaignModel";
import * as Mongoose from "mongoose";

let mongooseConnection: Mongoose.Connection = DataAccess.mongooseConnection;

export class CampaignSchema {

    static get schema(): Mongoose.Schema {
        return new Mongoose.Schema({
            sfid: { type: String, required: true }
            , name: { type: String, required: true }
            , logoUrl: { type: String, required: true }
            , description: { type: String, required: true }
            , campaignId: { type: String, required: true }
        });
    }
}

export default mongooseConnection.model<ICampaignModel>("Campaign", CampaignSchema.schema, "campaign");