import debug from "debug";
let logger = debug("c52::app::dataAccess::DataAccess");
logger("Logging for DataAccess");

import { AppConfig } from "../../config/settings/AppConfig";
import Mongoose from "mongoose";
import Bluebird from "bluebird";

(<any>Mongoose).Promise = Bluebird;

class DataAccess {
    // static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;

    constructor() {
        logger("DataAccess Constructor");
        DataAccess.connect();
    }

    static connect(): Mongoose.Connection {
        logger("connecting to MongoDB");
        if (this.mongooseConnection) {
            return this.mongooseConnection;
        }

        logger(`mongoUrl: ${AppConfig.settings.db.mongo.url}`.green.bold);
        logger(`mongo catalog: ${AppConfig.settings.db.mongo.catalog}`.green.bold);

        this.mongooseConnection = Mongoose.createConnection(`${AppConfig.settings.db.mongo.url}/${AppConfig.settings.db.mongo.catalog}`)
            .once("open", () => {
                console.log("\n\tconnected to mongodb on host:\t".cyan.bold,
                    AppConfig.settings.db.mongo.url.yellow.bold,
                    "\n\t\t\t\tusing:\t".cyan.bold,
                    AppConfig.settings.db.mongo.catalog.yellow.bold);
            });

        return this.mongooseConnection;
    }
}

DataAccess.connect();
export default DataAccess;