import * as debug from 'debug';
let logger = debug('c52:app');
import * as path from 'path';
import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import Middlewares from "./config/middlewares/base/MiddlewaresBase";

import { AppConfig } from './config/settings/AppConfig';
import { ConfigUtil } from './config/settings/ConfigUtil';

var color = require("colour");

// creates and configures an ExpressJS web server.
export class App {

    // ref to Express instance
    private app: Express.Application;
    private server: http.Server;
    private port: string | number | boolean;

    // run configuration methods on the Express instance.
    constructor() {
        this.app = Express();

        let env: string = process.argv[2];
        logger(`env val: ${env}\n\n`);

        // setup middlewares
        this.app.use(Middlewares.configuration);

        this.port = this.normalizePort(process.env.PORT || ConfigUtil.appConfig.settings.port);
        logger("port: ", this.port);

        //start the server
        this.server = http.createServer(this.app);
        logger(`server ${this.server}`);
        this.server.listen(this.port);
        this.server.on('error', this.onError);
        this.server.on('listening', this.onListening.bind(this));
    }

    private normalizePort(val: number | string): number | string | boolean {
        let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(port)) {
            return val;
        } else if (port >= 0) {
            return port;
        } else {
            return false;
        }
    }

    private onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') throw error;
        let bind = (typeof this.port === 'string') ? 'Pipe ' + this.port : 'Port ' + this.port;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    private onListening(): void {
        let addr = this.server.address();
        let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        logger(`Listening on ${bind}`);
        console.log(`\n\t*****  Express app listening on ${bind}  *****`.green.bold);
    }
}

export default new App();