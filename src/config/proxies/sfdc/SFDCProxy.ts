import debug from "debug";
let logger = debug("c52:proxies:sfdc:Proxy");
import { Constants } from "../../constants/Constants";
import { AppConfig } from "../../settings/AppConfig";
import RedisRepository from "../../../common/cache/RedisRepository";
import Request from "request";

export class SFDCProxy {
    private constants = new Constants();

    constructor() { }

    /*
     * public send method for all of SFDC calls
     * checks if accessToken is present and if accessTokenTTL has expired, refreshes the token as needed.
    */
    public send(req: any, callback: Function): void {
        RedisRepository.getByKey(this.constants.SFDC_AUTH_CACHE_KEY).then((val) => {
            let sfdcAuth = JSON.parse(val);

            logger("sfdcAuth: %O\n\n", sfdcAuth);
            let issuedTime = Number(sfdcAuth && sfdcAuth !== "undefined" ? sfdcAuth[this.constants.SFDC_ISSUED_AT] : null);

            if (isNaN(issuedTime) || issuedTime + AppConfig.settings.providers.salesforce.accessTokenTTL * 60 * 1000 < new Date().getTime()) {
                this.authenticate(req, (err: Error, res: Response, body: string) => {
                    if (err) {
                        let error = {
                            "status": "ERROR",
                            "ErrorCode": 10001,
                            "message": "internal server error"
                        };
                        logger("failed to authenticate to SFDC".red.bold);
                        callback(error);
                    } else {
                        logger("*****  auth complete, sending request  *****".yellow.bold);
                        logger("\nreq:\n%O\n".cyan.bold, req);
                        this.sendRequest(req, body, callback);
                    }
                });
            } else {
                logger("auth token not expired\n");
                this.sendRequest(req, sfdcAuth, callback);
            }
        });
    }

    // private send method that appends necessary values to the request
    private sendRequest(req: any, sfdcAuth: any, callback: Function): void {
        logger("sfdcAuth in proxy: ", sfdcAuth.access_token);
        req.auth = {
            "bearer": sfdcAuth.access_token
        };
        Request(req, (err: any, res: Request.Response, body: any): void => {
            logger("callback: %O", callback);
            callback(err, res, body);
        });
    }

    // get auth token for making sfdc api calls
    private authenticate(req: Request, callback: Function): void {
        logger("*****  Authenticating to SFDC.  *****\n".yellow.bold);

        let authForm: any = {};
        authForm[this.constants.SFDC_GRANT_TYPE] = this.constants.SFDC_GRANT_TYPE_VALUE_PASSWORD;
        authForm[this.constants.SFDC_USERNAME] = AppConfig.settings.providers.salesforce.username;
        authForm[this.constants.SFDC_PASSWORD] = AppConfig.settings.providers.salesforce.password;
        authForm[this.constants.SFDC_CLIENT_ID] = AppConfig.settings.providers.salesforce.clientId;
        authForm[this.constants.SFDC_CLIENT_SECRET] = AppConfig.settings.providers.salesforce.clientSecret;

        logger("authForm:".cyan.bold, authForm);
        logger("request:".cyan.bold, AppConfig.sfdcAuthUrl);

        Request.post(AppConfig.sfdcAuthUrl, { qs: authForm }, (error: any, res: any, jsonBody: string) => {
            logger("jsonBody:%O\n", jsonBody);
            let body = JSON.parse(jsonBody);

            if (error || (body && body.error)) {
                logger("error:".red.bold);
                logger(body, "\n");
                callback(body, res);
            } else {
                if (body[this.constants.SFDC_ACCESS_TOKEN]) {
                    logger("***** Acquired Access Token *****\n".green.bold);
                    logger(`*****  ${body.access_token}  *****\n`.cyan.bold);
                    RedisRepository.insert(this.constants.SFDC_AUTH_CACHE_KEY, JSON.stringify(body));
                } else {
                    logger("***** Missing Access Token *****\n".red.bold);
                    callback(body, res);
                }

                callback(error, res, body);
            }
        });
    }
}

export default new SFDCProxy();