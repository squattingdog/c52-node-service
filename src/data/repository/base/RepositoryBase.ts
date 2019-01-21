import debug from "debug";
let logger = debug("c52::app::repository::base::RepositoryBase");
logger("logging for RepositoryBase");

import { IRead } from "../interfaces/IRead";
import { IWrite } from "../interfaces/IWrite";
import * as Mongoose from "mongoose";

export abstract class RepositoryBase<T> implements IRead<T>, IWrite<T> {
    private _model: Mongoose.Model<Mongoose.Document>;

    public get model(): Mongoose.Model<Mongoose.Document> { return this._model; }

    constructor(schemaModel: Mongoose.Model<Mongoose.Document>) {
        this._model = schemaModel;
    }

    create(item: T, callback: (error: any, result: T) => void) {
        this._model.create(item, callback);
    }

    retrieve(callback: (error: any, result: T[]) => void) {
        logger("repositoryBase - retrieve");
        this._model.find({}, callback);
    }

    update(_id: Mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
        this._model.update({ _id: _id }, item, callback);
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
    }

    findById(_id: string, callback: (error: any, result: any) => void) {
        this._model.findById(_id, callback);
    }

    toObjectId(_id: string): Mongoose.Types.ObjectId {
        return Mongoose.Types.ObjectId.createFromHexString(_id);
    }
}