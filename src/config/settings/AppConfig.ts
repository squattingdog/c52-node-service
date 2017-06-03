import { SfdcSettings } from './providers/SfdcSettings';
import * as URL from 'url';

export interface ProviderSettings {
    readonly baseUrl: string;
    readonly authRoute: string;
    readonly accessTokenTTL: number;

    getAuthUrl(): string;
}

export class SSLSettings {
    readonly pfxPath: string;
    readonly pfxPass: string;
    readonly serveSSL: boolean;

    constructor(settings: {}) {

    }
}

export class MongoDBSettings {
    readonly url: string;
    readonly db: string;

    constructor(settings) {
        this.url = process.env.MONGODB_URI || settings.url;
        this.db = settings.db;
    }
}

export class SessionConfig {
    readonly secret: string;
    readonly ttl: number;
    readonly redisUrl: URL.Url;
    readonly resave: boolean;
    readonly saveUninitialized: boolean;
    readonly privateSessionDbId: string;

    constructor(settings) {
        this.secret = settings.secret;
        this.ttl = settings.ttl;
        this.redisUrl = URL.parse(settings.redisUrl);
        this.resave = settings.resave ? settings.resave : false;
        this.saveUninitialized = settings.saveUninitialized ? settings.saveUninitialized : false;
        this.privateSessionDbId = settings.privateSessionDbId;
    }
}

export class ConfigSettings {
    readonly hostname: string;
    readonly port: number;
    readonly allowedIPs: ReadonlyArray<string>;
    readonly session: SessionConfig;
    readonly sslSettings: SSLSettings;
    readonly mongoDBSettings: MongoDBSettings;
    readonly providers: ReadonlyArray<ProviderSettings>;

    constructor(settings) {
        this.hostname = settings.server.hostName;
        this.port = settings.server.port;
        this.allowedIPs = settings.server.allowedIPs;

        // setup session
        this.session = new SessionConfig(settings.session);

        // setup ssl
        if (settings.ssl) {
            this.sslSettings = new SSLSettings(settings.ssl);
        }

        // setup mongo db
        if (settings.mongoDB) {
            this.mongoDBSettings = new MongoDBSettings(settings.mongoDB);
        }

        // setup providers
        let providersArray: ProviderSettings[] = new Array();
        if (settings.providers && settings.providers.salesforce) {
            let sfdcSettings: SfdcSettings = new SfdcSettings(settings.providers.salesforce);
            providersArray.push(sfdcSettings);
        }

        let roProviders: ReadonlyArray<ProviderSettings> = providersArray;
        this.providers = roProviders;
    }
}

export class AppConfig {
    readonly settings: ConfigSettings;
    readonly debug: boolean;

    constructor(theSettings) {
        // populate / aggregate all config settings
        this.debug = theSettings.server.debug;
        this.settings = new ConfigSettings(theSettings);
    }
}