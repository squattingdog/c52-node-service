import { ProviderSettings } from '../AppConfig';

export class GoogleSettings implements ProviderSettings {
    baseUrl: string;
    authRoute: string;
    accessTokenTTL: number;

    constructor() {
        this.baseUrl = '';
        this.authRoute = '';
        this.accessTokenTTL = 480;
    }

    public getAuthUrl(): string {
        return this.baseUrl + this.authRoute;
    }
}