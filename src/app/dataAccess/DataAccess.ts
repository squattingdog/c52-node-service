import * as debug from "debug";
let logger = debug("c52::app::dataAccess::DataAccess");
logger("Logging for DataAccess");

import { ConfigUtil } from "../../config/settings/ConfigUtil";
import * as Mongoose from "mongoose";
import * as Bluebird from "bluebird";

(<any>Mongoose).Promise = Bluebird;

class DataAccess {
    //static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;

    constructor() {
        DataAccess.connect();
    }

    //static connect(): Mongoose.Connection {
    //    if (this.mongooseInstance) {
    //        return this.mongooseInstance;
    //    }

    //    this.mongooseConnection = Mongoose.Connection;
    //    this.mongooseConnection.once("open", () => {
    //        logger("connected to mongodb.");
    //    });

    //    this.mongooseInstance = Mongoose.createConnection(ConfigUtil.appConfig.settings.mongoDBSettings.url, { promiseLibrary: Bluebird });
    //        //.useDB("c52");
    //    return this.mongooseInstance;
    //}

    static connect(): Mongoose.Connection {
        if (this.mongooseConnection) {
            return this.mongooseConnection;
        }

       // this.mongooseConnection = Mongoose.Connection;
        this.mongooseConnection.once("open", () => {
            logger("connected to mongodb.");
        });

        this.mongooseConnection = Mongoose.createConnection(ConfigUtil.appConfig.settings.mongoDBSettings.url,
            {
                promiseLibrary: Bluebird,
                db: ConfigUtil.appConfig.settings.mongoDBSettings.db
            });
        return this.mongooseConnection;
    }
}

DataAccess.connect();
export default DataAccess;