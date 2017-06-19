import ISettings from "./interfaces/ISettings";

export class ConfigLocal implements ISettings {
    public get settings(): any {
        return {
            "server": {
                "port": 5000,
                "debug": true,
                "allowedIPs": ["::", "::ffff:127.0.0.1", "::1", "127.0.0.1"]
            },
            "session": {
                "redisUrl": "redis://h:p62805d3bce2d47408c51ee659d177c01f07a9d3aeb0115140500f64432065405@ec2-34-206-214-110.compute-1.amazonaws.com:45389",
                "secret": "asdf1234"
            },
            "ssl": {
                "enable": true,
                "pfxPath": "./certificates/c52a.pfx",
                "pfxPass": "passwd"
            },
            "mongoDB": {
                "url": "mongodb://localhost:27017",
                "database": "c52"
            },
            "providers": {
                "salesforce": {
                    "instanceUrl": "https://c52--theodev.cs22.my.salesforce.com/",
                    "clientId": "3MVG9OI03ecbG2VrbRZpCVyyOtHIlsbIVVUkOOL4.Z2XIBF4l0K28LexYlYViNjbEjay0tgN.tdtTAkxizUxB",
                    "clientSecret": "3647886391965436762",
                    "username": "c52nodeapi@church52.org",
                    "password": "plookij8*"
                }
            }
        };
    }
}

export default new ConfigLocal();