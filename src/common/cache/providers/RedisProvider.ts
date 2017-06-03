import * as Debug from "debug";
let logger = Debug("c52::common::cache::providers::RedisProvider");
logger("logging for RedisProvider");

import { ICacheProvider } from "./interfaces/ICacheProvider";
import { ConfigUtil } from "../../../config/settings/ConfigUtil";
import * as Redis from "redis";
import * as Bluebird from "bluebird";

var color = require("colors");

Bluebird.promisifyAll((<any>Redis).RedisClient.prototype);
Bluebird.promisifyAll((<any>Redis).Multi.prototype);

export class RedisProvider implements ICacheProvider {
    private client: Redis.RedisClient;

    constructor() { }

    public getClient(): Redis.RedisClient {
        if (this.client) {
            return this.client;
        }

        this.client = this.connect();
        return this.client;
    }

    private connect(): Redis.RedisClient {
        let pw = ConfigUtil.appConfig.settings.session.redisUrl.auth.split(":")[1]; 
        let client: Redis.RedisClient = Redis.createClient({
            url: ConfigUtil.appConfig.settings.session.redisUrl.href
            , db: ConfigUtil.appConfig.settings.session.privateSessionDbId
        });
        logger("pw".cyan.bold, pw.cyan.bold);
        client.auth(pw);
        client.on("error", (err) => {
                logger("Redis Error:".red.bold, err);
            })
            .on("ready", () => {
                console.log("\n\tconnected to redis on host:\t".cyan.bold, ConfigUtil.appConfig.settings.session.redisUrl.hostname.yellow.bold);
            });

        return client;
    }
}

export default new RedisProvider();