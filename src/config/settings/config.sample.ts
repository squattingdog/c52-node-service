﻿import ISettings from "./interfaces/ISettings";

export class ConfigSample implements ISettings {
    public get settings(): any {
        return {
            "server": {
                "debug": true,
                "allowedIPs": ["::", "::ffff:127.0.0.1", "::1", "127.0.0.1"]
            },
            "ssl": {
                "enable": true,
                "pfxPath": "./certificates/c52a.pfx",
                "pfxPass": "passwd"
            },
            "session": {
                "redisUrl": "redis://127.0.0.1:6379",
                "secret": "" // make up a secret value
            },
            "providers": {
                "salesforce": {
                    "instanceUrl": "",
                    "clientId": "",
                    "clientSecret": "",
                    "username": "",
                    "password": ""
                }
            }
        };
    }
}

export default new ConfigSample();