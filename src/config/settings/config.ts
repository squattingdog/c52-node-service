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
                "privateSessionDbId": "1"
            },
            "mongoDB": {
                "url": process.env.MONGODB_URI || "mongodb://localhost:27017",
                "db": process.env.MONGODB_DB || "c52"
            },
            "providers": {
                "salesforce": {
                    "clientId": process.env.SFDC_CLIENT_ID,
                    "clientSecret": process.env.SFDC_CLIENT_SECRET,
                    "username": process.env.SFDC_USERNAME,
                    "password": process.env.SFDC_PASSWORD,
                    "instanceUrl": process.env.SFDC_INSTANCE_URL,
                    "authRoute": "services/oauth2/token",
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