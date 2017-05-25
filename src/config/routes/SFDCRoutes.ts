import * as debug from 'debug';
let logger = debug('c52::routes::sfdc::sfdcRouter');
import { Router, Request, Response, NextFunction } from 'express';
import Proxy from '../../config/proxies/sfdc/Proxy';
import { AppConfig } from '../../config/settings/AppConfig';

export class SFDCRoutes {
    private router: Router;

    constructor() {
        this.router = Router();
        //this.sfproxy = new Proxy();
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
        var routeUri = 'https://c52--theodev.cs22.my.salesforce.com/services/data/v37.0/parameterizedSearch/?q=' + req.params.q + '&sobject=Account&Account.fields=id,name&Account.limit=10';
        var sfRequest = {
            method: 'GET',
            uri: routeUri
        };

        Proxy.send(sfRequest, (error, prxyRes, body) => {
            if (error) {
                logger(error);
                res.status(500).send(prxyRes);
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