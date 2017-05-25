import DataAccess from "../DataAccess";
import { ICampaignModel } from "../../model/interfaces/ICampaignModel";
import * as Mongoose from "mongoose";

//let mongoose: any = DataAccess.mongooseInstance;
//let mongooseConnection: Mongoose.Connection = DataAccess.mongooseConnection;

export class CampaignSchema {

    static get schema(): Mongoose.Schema {
        return new Mongoose.Schema({
            sfid: { type: String, required: true },
            name: { type: String, required: true },
            logoUrl: { type: String, required: true },
            description: { type: String, required: true }
        });
    }
}

export default Mongoose.model<ICampaignModel>("Campaign", CampaignSchema.schema, "Campaigns", true);