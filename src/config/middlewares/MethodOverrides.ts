import * as Express from "express";
import * as MethodOverride from "method-override";

export class MethodOverrides {
    static configuration(): any {
        let app: Express.Application = Express();
        app.use(MethodOverride("X-HTTP-METHOD"));

        return app;
    }
}

Object.seal(MethodOverrides);
