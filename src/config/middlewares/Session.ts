import * as Express from "express";
import * as ExpressSession from "express-session";
import * as RedisStore from "connect-redis";
import * as Redis from "redis";
import { ConfigUtil } from "../settings/ConfigUtil";

export class Session {
    private app: Express.Application;

    constructor() {
        this.app = Express();
        this.initExpressSession();
    }

    public get exressSession(): Express.Application {
        return this.app;
    }

    private initExpressSession(): void {
        let client: Redis.RedisClient = Redis.createClient({
            port: Number(ConfigUtil.appConfig.settings.session.redisUrl.port)
            , host: ConfigUtil.appConfig.settings.session.redisUrl.hostname
            , db: "1"
        });

        let store: RedisStore.RedisStore = RedisStore(ExpressSession);

        this.app.use(ExpressSession({
            store: new store({
                client: client
                , ttl: ConfigUtil.appConfig.settings.session.ttl
            }),
            secret: ConfigUtil.appConfig.settings.session.secret,
            resave: ConfigUtil.appConfig.settings.session.resave,
            saveUninitialized: ConfigUtil.appConfig.settings.session.saveUninitialized
        }));
    }
}

export default Session;