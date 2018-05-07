import * as Express from "express";
import * as BodyParser from "body-parser";
import * as mLogger from 'morgan';
import { MethodOverrides } from "../MethodOverrides";
import { BaseRoutes } from "../../routes/base/BaseRoutes";
import { Session } from "../Session";
import { CorsOverrides } from "../CorsOerrides";

export class MiddlewaresBase {
    static setConfiguration(app: Express.Application):void {
        app.use(mLogger('dev'));
        //init session
        app.use(new Session().getExpressSession());
        app.use(BodyParser.json());
        app.use(BodyParser.urlencoded({ extended: false }));
       
        app.use(CorsOverrides.configuration());
        app.use(MethodOverrides.configuration());
    }
}

export default MiddlewaresBase;

Object.seal(MiddlewaresBase);