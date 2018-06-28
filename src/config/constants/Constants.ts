export class Constants {
    // crypto

    // sfdc
    readonly SFDC_CLIENT_ID: string = "client_id";
    readonly SFDC_CLIENT_SECRET: string = "client_secret";
    readonly SFDC_GRANT_TYPE: string = "grant_type";
    readonly SFDC_GRANT_TYPE_VALUE_PASSWORD: string = "password";
    readonly SFDC_USERNAME: string = "username";
    readonly SFDC_PASSWORD: string = "password";
    readonly SFDC_ACCESS_TOKEN: string = "access_token";
    readonly SFDC_ISSUED_AT: string = "issued_at";
    readonly SFDC_AUTH_CACHE_KEY: string = "sfdcAuth";
}

const constants: Constants = new Constants();
export default constants;