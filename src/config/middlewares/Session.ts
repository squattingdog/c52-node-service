import { RequestHandler } from "express";
import ExpressSession from "express-session";
import RedisStore from "connect-redis";
import Redis from "redis";
import { AppConfig } from "../settings/AppConfig";

export class Session {

    constructor() {  }

    public getExpressSession(): RequestHandler {
        let client: Redis.RedisClient = Redis.createClient({
            url: AppConfig.settings.session.redis.url
            , db: "1"
        });

        let store: RedisStore.RedisStore = RedisStore(ExpressSession);

        return ExpressSession({
            store: new store({
                client: client
                , ttl: AppConfig.settings.session.redis.ttl
            }),
            secret: AppConfig.settings.session.redis.secret,
            resave: AppConfig.settings.session.redis.resave,
            saveUninitialized: AppConfig.settings.session.redis.saveUninitialized
        });
    }
}

export default Session;