import DataAccess from "../DataAccess";
import Mongoose from "mongoose";
import { IJobModel } from "../../model/interfaces/IJobModel";

let mongooseConnection: Mongoose.Connection = DataAccess.mongooseConnection;

export class JobSchema {

    static get schema(): Mongoose.Schema {
        let schema: Mongoose.Schema = new Mongoose.Schema({
            jobId: { type: String, required: true }
            , name: { type: String, required: true }
            , description: { type: String, required: true }
            , skills: { type: String, required: true }
            , ongoing: { type: Boolean, required: true }
            , numberOfVolunteersStillNeeded: { type: Number, required: true }
            , nubmerOfShifts: { type: Number, required: true }
            , active: { type: Boolean, required: true }
            , location: { type: Object, required: false }
            , campaignId: { type: String, required: true }
            , displayOnWebsite: { type: Boolean, required: true }
        });

        return schema;
    }
}

export default mongooseConnection.model<IJobModel>("JobModel", JobSchema.schema, "job");