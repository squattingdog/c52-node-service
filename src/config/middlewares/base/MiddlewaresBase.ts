import * as Express from "express";
import * as BodyParser from "body-parser";
import { MethodOverrides } from "../MethodOverrides";
import { Session } from "../Session";
import { CorsOverrides } from "../CorsOerrides";

export class MiddlewaresBase {
    static configure(app: Express.Application): void {
        // init session
        app.use(new Session().getExpressSession());
        app.use(BodyParser.json());
        app.use(BodyParser.urlencoded({ extended: false }));

        app.use(CorsOverrides.configure());
        app.use(MethodOverrides.configure(app));
    }
}

export default MiddlewaresBase;

Object.seal(MiddlewaresBase);