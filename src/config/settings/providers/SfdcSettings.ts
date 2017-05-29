import { ProviderSettings } from '../AppConfig';

export class SfdcSettings implements ProviderSettings {

    accessTokenTTL: number;
    authRoute: string;
    baseUrl: string;
    apexRestSvc: string;
    clientId: string;
    clientSecret: string;
    password: string;
    username: string;

    constructor(settings) {
        this.accessTokenTTL = settings.accessTokenTTL;
        this.authRoute = settings.authRoute;
        this.baseUrl = settings.instanceUrl;
        this.apexRestSvc = settings.apexRestSvc;
        this.clientId = settings.clientId;
        this.clientSecret = settings.clientSecret;
        this.password = settings.password;
        this.username = settings.username;
    }

    public getAuthUrl(): string {
        return this.baseUrl + this.authRoute;
    }
    public getApexRestUrl(): string {
        return this.baseUrl + this.apexRestSvc;
    }
}