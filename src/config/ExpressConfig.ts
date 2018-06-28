import debug from "debug";
let logger = debug("GMS::config::ExpressConfig");
logger("logging GMS App - Express Configurations");

import express from "express";
import * as colors from "colors";
import MiddlewaresBase from "./middlewares/base/MiddlewaresBase";
import BaseRoutes from "./routes/base/BaseRoutes";

export class ExpressConfig {

    private _app: express.Application;           // The express instance

    // run configuration methods on the Express instance.
    constructor() {
        // call reset method on colors because typescript complains about the module being declared
        //  but not used.  Colors is a runtime augmentation of the String prototype
        //
        //  TODO:: Investigate this and find a way to remove it.
        colors.reset;

        // instantiate the express app
        this._app = express();

        // setup middlewares
        MiddlewaresBase.configure(this._app);

        // setup the routes
        BaseRoutes.configure(this._app);
    }

    get app() {
        return this._app;
    }
}

export default new ExpressConfig();