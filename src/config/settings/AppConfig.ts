export class AppConfig {
    public static get settings(): any {
        return {
            "server": {
                "allowedHeaders": process.env.ALLOWED_HEADERS || ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
                "port": process.env.PORT || 5000,
                "debug": false,
                "methods": process.env.ALLOWED_METHODS || "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
                "origin": process.env.ALLOWED_ORIGIN || "*"
            },
            "session": {
                "redis": {
                    "url": process.env.REDIS_URL || "redis://127.0.0.1:6379",
                    "secret": process.env.REDIS_SECRET || "asdf1234",
                    "ttl": process.env.REDIS_TTL || 480,
                    "saveUninitialized": false,
                    "resave": false,
                    "privateSessionDbId": "1"
                }
            },
            "db": {
                "mongo": {
                    "url": process.env.MONGODB_URI || "mongodb://localhost:27017",
                    "catalog": process.env.MONGODB_DB || "c52",
                    "useMongoClient": process.env.MONOGODB_USE_MONGO_CLIENT || true
                }
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
                    "accessTokenTTL": process.env.SFDC_TTL || 10,
                    "apiVersion": process.env.SFDC_API_VERSION || "44.0"
                },
                "google": {

                },
                "facebook": {

                }
            }
        };
    }

    public static get sfdcAuthUrl(): string {
        return AppConfig.settings.providers.salesforce.instanceUrl
        + AppConfig.settings.providers.salesforce.authRoute;
    }
    public static get sfdcApexRestUrl(): string {
        return AppConfig.settings.providers.salesforce.instanceUrl
        + AppConfig.settings.providers.salesforce.apexRestSvc
        + "v"
        + AppConfig.settings.providers.salesforce.apiVersion
        + "/";
    }
    public static get sfdcSoslUrl(): string {
        return AppConfig.settings.providers.salesforce.instanceUrl
        + "services/data/v"
        + AppConfig.settings.providers.salesforce.apiVersion
        + "/";
    }
}