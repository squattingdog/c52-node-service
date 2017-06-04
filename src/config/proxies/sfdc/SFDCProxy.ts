import * as debug from "debug";
let logger = debug("c52:proxies:sfdc:Proxy");
import * as Request from "request";
import { Constants } from "../../constants/Constants";
import { AppConfig } from "../../settings/AppConfig";
import { SfdcSettings } from "../../settings/providers/SfdcSettings";
import { ConfigUtil } from "../../settings/ConfigUtil";
import RedisRepository from "../../../common/cache/RedisRepository";

var color = require("colors");

export class SFDCProxy {
    private constants = new Constants();

    constructor() { }

    /*
     * public send method for all of SFDC calls
     * checks if accessToken is present and if accessTokenTTL has expired, refreshes the token as needed.
    */
    public send(req, callback): void {
        RedisRepository.getByKey(this.constants.SFDC_AUTH_CACHE_KEY).then((val) => {
            let sfdcAuth = JSON.parse(val);

            logger("sfdcAuth: %O\n\n", sfdcAuth);
            let issuedTime = Number(sfdcAuth && sfdcAuth !== "undefined" ? sfdcAuth[this.constants.SFDC_ISSUED_AT] : null);

            if (isNaN(issuedTime) || issuedTime + ConfigUtil.appConfig.settings.providers[0].accessTokenTTL * 60 * 1000 < new Date().getTime()) {
                this.authenticate(req, (err, res, body) => {
                    if (err) {
                        var error = { "error": "failed to connect to SFDC" }
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
    private sendRequest(req, sfdcAuth, callback): void {
        logger("sfdcAuth in proxy: ", sfdcAuth.access_token);
        req.auth = {
            "bearer": sfdcAuth.access_token
        };
        Request(req, (err, res, body): void => {
            logger("callback: %O", callback);
            callback(err, res, body);
        });
    }

    // get auth token for making sfdc api calls
    private authenticate(req, callback): void {
        logger("*****  Authenticating to SFDC.  *****\n".yellow.bold);

        var authForm = {};
        authForm[this.constants.SFDC_GRANT_TYPE] = this.constants.SFDC_GRANT_TYPE_VALUE_PASSWORD;
        authForm[this.constants.SFDC_USERNAME] = (<SfdcSettings>ConfigUtil.appConfig.settings.providers[0]).username;
        authForm[this.constants.SFDC_PASSWORD] = (<SfdcSettings>ConfigUtil.appConfig.settings.providers[0]).password;
        authForm[this.constants.SFDC_CLIENT_ID] = (<SfdcSettings>ConfigUtil.appConfig.settings.providers[0]).clientId;
        authForm[this.constants.SFDC_CLIENT_SECRET] = (<SfdcSettings>ConfigUtil.appConfig.settings.providers[0]).clientSecret;

        logger("authForm:".cyan.bold, authForm);
        logger("request:".cyan.bold, ConfigUtil.appConfig.settings.providers[0].getAuthUrl());

        Request.post(ConfigUtil.appConfig.settings.providers[0].getAuthUrl(), { qs: authForm }, (error: any, res: any, jsonBody: string) => {
            logger("jsonBody:%O\n", jsonBody);
            let body = JSON.parse(jsonBody);

            if (error || (body && body.error)) {
                logger("error: %0\n".red.bold, body);
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