import { AppConfig } from "./../settings/AppConfig";
import * as Express from "express";
import Cors from "cors";

export class CorsOverrides {
    static configure(): Express.RequestHandler {
        const options: Cors.CorsOptions = {
            allowedHeaders: AppConfig.settings.server.allowedHeaders,
            credentials: false,
            methods: AppConfig.settings.server.methods,
            origin: AppConfig.settings.server.origin,
            preflightContinue: false
        };

        return Cors(options);
    }
}

Object.seal(CorsOverrides);
