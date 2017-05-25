import * as Debug from "debug";
let logger = Debug("c52::common::cache::providers::RedisProvider");
logger("logging for RedisProvider");

import { ICacheProvider } from "./interfaces/ICacheProvider";
import { ConfigUtil } from "../../../config/settings/ConfigUtil";
import * as Redis from 'redis';
import * as Bluebird from 'bluebird';
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
        let client: Redis.RedisClient = Redis.createClient({
            port: Number(ConfigUtil.appConfig.settings.session.redisUrl.port)
            , host: ConfigUtil.appConfig.settings.session.redisUrl.hostname
            , db: ConfigUtil.appConfig.settings.session.privateSessionDbId
        })
            .on('error', (err) => {
                logger(err);
            });

        return client;
    }
}

export default new RedisProvider();