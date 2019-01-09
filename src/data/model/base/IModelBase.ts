import { Document } from "mongoose";

export interface IModelBase extends Document {
    mid: string;
}