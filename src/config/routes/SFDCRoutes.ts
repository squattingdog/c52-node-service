import * as debug from 'debug';
let logger = debug('c52::routes::sfdc::sfdcRouter');
import { Router, Request, Response, NextFunction } from 'express';
import SFDCProxy from '../../config/proxies/sfdc/SFDCProxy';
//import { AppConfig } from '../../config/settings/AppConfig';

import { ConfigUtil } from "../../config/settings/ConfigUtil";
import { SfdcSettings } from "../../config/settings/providers/SfdcSettings";

export class SFDCRoutes {
    private router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    /*
     * public getter so the router object cannot be swapped
    */
    public get routes(): Router {
        logger("sfdc router: ", this.router);
        return this.router;
    }

    /*
     * Take each handler and attach to one of the Express.Router's endpoints.
    */
    private initRoutes() {
        this.router.get('/v1/sfdc/', this.smokeTest.bind(this));
        this.router.get('/v1/sfdc/accounts/:q', this.getAccount.bind(this));
    }

    /*
     * get list of accounts by query param.
    */
    public getAccount(req: Request, res: Response, next: NextFunction) {
        logger('\nrequest param q: %s\n', req.params.q);
        var routeUri = (<SfdcSettings>ConfigUtil.appConfig.settings.providers[0]).getSoslUrl() + 'parameterizedSearch/?q=' + req.params.q + '&sobject=Account&Account.fields=id,name&Account.limit=10';
        var sfRequest = {
            method: 'GET',
            uri: routeUri
        };

        SFDCProxy.send(sfRequest, (error, prxyRes, body) => {
            if (error) {
                logger(error);
                res.status(500).send(error);
            } else {
                logger('got the callback');
                res.send(JSON.parse(body));
            }
        });
    }

    public smokeTest(req: Request, res: Response, next: NextFunction) {
        res.json({
            message: 'SFDC Router is online and ready for requests!!'
        });
    }
}

Object.seal(SFDCRoutes);

export default SFDCRoutes;