import * as Express from "express";
import * as BodyParser from "body-parser";
import * as mLogger from 'morgan';
import { MethodOverrides } from "../MethodOverrides";
import BaseRoutes from "../../routes/base/BaseRoutes";
import { Session } from "../Session";

export class MiddlewaresBase {
    static get configuration():Express.Application {
        let app: Express.Application = Express();
        app.use(mLogger('dev'));
        app.use(BodyParser.json());
        app.use(BodyParser.urlencoded({ extended: false }));
        app.use(new Session().exressSession);
        app.use(MethodOverrides.configuration());
        app.use(new BaseRoutes().routes);      

        return app;
    }
}

export default MiddlewaresBase;

Object.seal(MiddlewaresBase);