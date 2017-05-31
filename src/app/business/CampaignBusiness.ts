import * as debug from "debug";
let logger = debug("c52::app::business::CampaignBusiness");
logger("logging for CampaignBusiness");

import { CampaignRepository } from "../repository/CampaignRepository";
import { ICampaignBusiness } from "./interfaces/ICampaignBusiness";
import { ICampaignModel } from "../model/interfaces/ICampaignModel";

export class CampaignBusiness implements ICampaignBusiness {
    private campaignRepo: CampaignRepository;

    constructor() {
        this.campaignRepo = new CampaignRepository();
    }

    create(item: ICampaignModel, callback: (error: any, result: any) => void) {
        logger(`item: ${item}\n`);
        this.campaignRepo.create(item, callback);
    }

    retrieve(callback: (error: any, result: any) => void) {
        logger("campaign business - getting campaigns");
        this.campaignRepo.retrieve(callback);
    }

    update(_id: string, item: ICampaignModel, callback: (error: any, result: any) => void) {
        logger(`_id: ${_id}\nitem: ${item}\n`);
        this.campaignRepo.findById(_id, (err, res) => {
            if (err) {
                logger(`retrieve error:\n${err}`);
                callback(err, res);
            } else {
                logger(`found item id: ${res._id}\n`);
                this.campaignRepo.update(res._id, item, callback);
            }
        });
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        logger(`_id: ${_id}\n`);
        this.campaignRepo.delete(_id, callback);
    }

    findById(_id: string, callback: (error: any, result: any) => void) {
        logger(`_id: ${_id}\n`);
        this.campaignRepo.findById(_id, callback);
    }
}

Object.seal(CampaignBusiness);