﻿import * as debug from "debug";
let logger = debug("c52::app::dataAccess::DataAccess");
logger("Logging for DataAccess");

import { ConfigUtil } from "../../config/settings/ConfigUtil";
import * as Mongoose from "mongoose";
import * as Bluebird from "bluebird";
var color = require("colors");

(<any>Mongoose).Promise = Bluebird;

class DataAccess {
    //static mongooseInstance: any;
    public static mongooseConnection: Mongoose.Connection;

    constructor() {
        logger("DataAccess Constructor");
        DataAccess.connect();
    }

    static connect(): Mongoose.Connection {
        logger("connecting to MongoDB");
        if (this.mongooseConnection) {
            return this.mongooseConnection;
        }

        this.mongooseConnection = Mongoose.createConnection(ConfigUtil.appConfig.settings.mongoDBSettings.url + "/" + ConfigUtil.appConfig.settings.mongoDBSettings.db)
            .once("open", () => {
                console.log("\n\tconnected to mongodb on host:\t".cyan.bold, ConfigUtil.appConfig.settings.mongoDBSettings.url.yellow.bold, "\n\t\t\t\tusing:\t".cyan.bold, ConfigUtil.appConfig.settings.mongoDBSettings.db.yellow.bold);
            });

        return this.mongooseConnection;
    }
}

DataAccess.connect();
export default DataAccess;