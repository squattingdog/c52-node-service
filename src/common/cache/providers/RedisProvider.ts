import debug from "debug";
let logger = debug("c52::common::cache::providers::RedisProvider");
logger("logging for RedisProvider");

import { ICacheProvider } from "./interfaces/ICacheProvider";
import { AppConfig } from "../../../config/settings/AppConfig";
import * as Redis from "redis";
import Bluebird from "bluebird";
import { Optional } from "../../../../typings/globals";

Bluebird.promisifyAll((<any>Redis).RedisClient.prototype);
Bluebird.promisifyAll((<any>Redis).Multi.prototype);

export class RedisProvider implements ICacheProvider {
    private client: Optional<Redis.RedisClient> = undefined;

    constructor() { }

    public getClient(): Redis.RedisClient {
        if (this.client) {
            return this.client;
        }

        this.client = this.connect();
        return <Redis.RedisClient>this.client;
    }

    private connect(): Redis.RedisClient {
        let pw: string;

        // let client: Redis.RedisClient;
            // pw = AppConfig.settings.session.redis.url.auth.split(":")[1];
            // logger("pw".cyan.bold, pw.cyan.bold);
        let client = Redis.createClient({
            url: process.env.REDIS_URL
        });

        client
            .on("error", (err) => {
                logger("Redis Error:".red.bold, err);
            })
            .on("ready", () => {
                console.log("\n\tconnected to redis on host:\t".cyan.bold, AppConfig.settings.session.redis.url.hostname);
            });

        return client;
    }
}

export default new RedisProvider();