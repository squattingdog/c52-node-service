import * as debug from 'debug';
let logger = debug('c52:routes:sfdc:sfdcInboundRouter');
import { Router, Request, Response, NextFunction } from 'express';
import { AppConfig } from '../../config/settings/AppConfig';
import { ConfigUtil } from "../../config/settings/ConfigUtil";
import { SfdcSettings } from '../../config/settings/providers/SfdcSettings';
import { Proxy } from '../../config/proxies/sfdc/Proxy';

/*
 * Inbound routes that SFDC will use to trigger updates to mongoDB data
*/
export class SFDCInboundRouter {
    private router: Router;
    private sfdcRoutes;
    private sfdcProxy: Proxy;

    constructor() {
        this.router = Router();
        this.sfdcRoutes = require('./routes.json');
        this.sfdcProxy = new Proxy();

        this.init();
    }

    /*
     * public getter so the router object cannot be swapped
    */
    public getRouter(): Router {
        return this.router;
    }

    /*
     * Take each handler and attach to one of the Express.Router's endpoints.
    */
    private init() {
        this.router.get('/', this.smokeTest.bind(this));
        this.router.get('/campaigns/volunteer', this.updateVolunteerCampaigns.bind(this));
    }

    /*
     * Route used to update volunteer job data
    */
    public updateVolunteerCampaigns(req: Request, res: Response, next: NextFunction): void {
        logger('\nUpdate Volunteer Campaigns');
        var routeUri = (<SfdcSettings>ConfigUtil.appConfig.settings.providers[0]).getApexRestUrl() + this.sfdcRoutes.Campaigns.VolunteerCampaigns;
        logger('route:', routeUri);
        var sfRequest = {
            method: 'GET',
            uri: routeUri
        };

        this.sfdcProxy.send(sfRequest, (error, prxyRes, body) => {
            if (error) {
                logger(error);
                res.status(500).send(prxyRes);
            } else {
                res.send(JSON.parse(body));
            }
        });
    }

    /*
     * smoketest route used to check handlers are online
    */
    public smokeTest(req: Request, res: Response, next: NextFunction) {
        res.json({
            message: 'SFDC Inbound Router is online and ready for requests!!'
        });
    }
}

export default new SFDCInboundRouter();