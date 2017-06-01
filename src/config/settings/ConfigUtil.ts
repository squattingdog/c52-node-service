import * as debug from "debug";
let logger = debug("c52:config:ConfigUtil");

import { AppConfig } from "./AppConfig";
import * as extend from "extend";
import ISettings from "./interfaces/ISettings";
import Config from "./config";
import ConfigLocal from "./config.local";


export class ConfigUtil {
    private static _appConfig: AppConfig;

    public static get appConfig(): AppConfig {
        return ConfigUtil._appConfig;
    }

    constructor() {
        let env: string = process.argv[2];
        ConfigUtil.initSettings(env);
    }

    private static initSettings(startupType: String): void {
        if (ConfigUtil._appConfig) {
            return;
        }

        var startupArgs: {};
        var customConfig: ISettings = null;
        logger("startupArgs:\n%O\n\n", startupArgs);

        switch (startupType.toLowerCase()) {
            case "dev":
                customConfig = ConfigLocal;
                logger("customConfig:\n%O\n\n", customConfig.settings);
                process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
                break;
            case "qa":

                break;
            case "uat":

                break;
            case "prod":

                break;
            default:
                console.error("Unknown startup type:", startupType);
                process.exit(1);
                break;
        }

        if (customConfig) {
            startupArgs = extend(true, Config.settings, customConfig.settings);
        } else {
            startupArgs = Config.settings;
        }

        logger("mergedArgs:\n%O\n\n", startupArgs);

        ConfigUtil._appConfig = new AppConfig(startupArgs);
    }
}

export default new ConfigUtil();