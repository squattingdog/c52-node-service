﻿import debug from "debug";
let logger = debug("c52:app");
logger("logging app");

import * as Express from "express";
import * as http from "http";
import { AppConfig } from "./config/settings/AppConfig";
import { ExpressConfig } from "./config/ExpressConfig";
import * as dotenv from "dotenv";
dotenv.config();


// creates and configures an ExpressJS web server.
export class App {

    // ref to Express instance
    private app: Express.Application;
    private server: http.Server;
    private port: string | number | boolean;

    // run configuration methods on the Express instance.
    constructor() {

        // get Express App instance with middlewares setup.
        this.app = new ExpressConfig().app;

        this.port = this.normalizePort(AppConfig.settings.server.port);

        // start the server
        this.server = http.createServer(this.app);
        this.server.listen(this.port);
        this.server.on("error", this.onError);
        this.server.on("listening", this.onListening.bind(this));
    }

    private normalizePort(val: number | string): number | string | boolean {
        let port: number = (typeof val === "string") ? parseInt(val, 10) : val;
        if (isNaN(port)) {
            return val;
        } else if (port >= 0) {
            return port;
        } else {
            return false;
        }
    }

    private onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== "listen") throw error;
        let bind = (typeof this.port === "string") ? "Pipe " + this.port : "Port " + this.port;
        switch (error.code) {
            case "EACCES":
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    private onListening(): void {
        let addr = this.server.address();
        let bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
        logger(`Listening on ${bind}`);
        console.log(`\n\t*****  Express app listening on ${bind}  *****`.green.bold);
    }
}

export default new App();