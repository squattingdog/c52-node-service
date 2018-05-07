import * as Express from 'express';
import * as Cors from 'cors';

export class CorsOverrides {
    static configuration():Express.RequestHandler {
        const options:Cors.CorsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
            credentials: false,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: '*',
            preflightContinue: false
        };

        return Cors();
    }
}

Object.seal(CorsOverrides);
