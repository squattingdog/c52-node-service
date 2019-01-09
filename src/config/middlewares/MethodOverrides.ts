import { Application } from "express";
import MethodOverride from "method-override";

export class MethodOverrides {
    static configure(app: Application): any {
        return MethodOverride("X-HTTP-METHOD");
    }
}

export default MethodOverrides;
Object.seal(MethodOverrides);
