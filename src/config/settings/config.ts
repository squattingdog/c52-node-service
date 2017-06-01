import ISettings from "./interfaces/ISettings";

export class Config implements ISettings {
    public get settings(): any {
        return {
            "server": {
                "port": process.env.PORT || 5000,
                "debug": false
            },
            "session": {
                "redisUrl": process.env.REDIS_URL || "redis://127.0.0.1:6379",
                "secret": process.env.REDIS_SECRET || "asdf1234",
                "ttl": 480,
                "saveUnitialized": false,
                "resave": false,
                "privateSessionDbId": "3"
            },
            "mongoDB": {
                "url": process.env.MONGODB_URL || "mongodb://localhost:27017",
                "db": process.env.MONGODB_DB || "c52"
            },
            "providers": {
                "salesforce": {
                    "authRoute": "services/oauth2/token",
                    "instanceUrl": process.env.SFDC_INSTANCE_URL,
                    "apexRestSvc": "services/apexrest/",
                    "accessTokenTTL": 10
                },
                "google": {

                },
                "facebook": {

                }
            }
        };
    } 
}

export default new Config();