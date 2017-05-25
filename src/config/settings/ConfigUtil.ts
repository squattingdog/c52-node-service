import * as debug from 'debug';
let logger = debug('c52:config:ConfigUtil');
import { AppConfig } from './AppConfig';
import * as extend from 'extend';

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

        var startupArgs = require('./config.json');
        var customArgs: {};
        logger('startupArgs:\n%O\n\n', startupArgs);

        switch (startupType.toLowerCase()) {
            case 'dev':
                customArgs = require('./config.local.json');
                logger('customArgs:\n%O\n\n', customArgs);
                process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
                break;
            case 'qa':

                break;
            case 'uat':

                break;
            case 'prod':

                break;
            default:
                console.error('Unknown startup type:', startupType);
                process.exit(1);
                break;
        }

        startupArgs = extend(true, startupArgs, customArgs);
        logger('mergedArgs:\n%O\n\n', startupArgs);

        ConfigUtil._appConfig = new AppConfig(startupArgs);
        //return this.appConfig;
    }
}

export default new ConfigUtil();