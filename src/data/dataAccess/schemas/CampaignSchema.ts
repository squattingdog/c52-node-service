import DataAccess from "../DataAccess";
import { ICampaignModel } from "../../model/interfaces/ICampaignModel";
import Mongoose from "mongoose";

let mongooseConnection: Mongoose.Connection = DataAccess.mongooseConnection;

export class CampaignSchema {

    static get schema(): Mongoose.Schema {
        let schema: Mongoose.Schema = new Mongoose.Schema({
            name: { type: String, required: true }
            , logoUrl: { type: String, required: true }
            , description: { type: String, required: true }
            , campaignId: { type: String, required: true }
        });

        return schema;
    }
}

export default mongooseConnection.model<ICampaignModel>("CampaignModel", CampaignSchema.schema, "campaign");