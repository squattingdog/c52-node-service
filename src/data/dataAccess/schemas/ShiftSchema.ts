import Mongoose from "mongoose";
import DataAccess from "../DataAccess";
import { IShiftModel } from "../../model/interfaces/IShiftModel";

let mongooseConnection: Mongoose.Connection = DataAccess.mongooseConnection;
export class ShiftSchema {

    static get schema(): Mongoose.Schema {
        let schema: Mongoose.Schema = new Mongoose.Schema({
            shiftId: {type: String, required: true },
            jobId: { type: String, required:  true },
            name: { type: String, required: true },
            description: { type: String, required: false },
            startDateTime: { type: Date, required: true },
            duration: { type: Number, required: true },
            active: { type: Boolean, required: true },
            numberOfVolunteersStillNeeded: { type: Number, required: false },
            desiredNumberOfVolunteers: { type: Number, required: true },
            totalVolunteers: { type: Number, required: true },
            location: { type: Object, required: false }

        });

        return schema;
    }
}

export default mongooseConnection.model<IShiftModel>("ShiftModel", ShiftSchema.schema, "shift");