import debug from "debug";
let logger = debug("c52::app::data::service::CampaignService");
logger("logging for CampaignService");

import { CampaignRepository } from "../repository/CampaignRepository";
import { ICampaignService } from "./interfaces/ICampaignService";
import { ICampaignModel } from "../model/interfaces/ICampaignModel";
import { CampaignModel } from "./../model/CampaignModel";
import { Optional } from "../../../typings/globals";

export class CampaignService implements ICampaignService {
    private campaignRepo: CampaignRepository;

    constructor() {
        this.campaignRepo = new CampaignRepository();
    }

    create(item: ICampaignModel, callback: (error: any, result: any) => void) {
        throw new Error("do not implement.  Campaigns should not be created.");
        // logger(`item: ${item}\n`);
        // this.campaignRepo.create(item, callback);
    }

    retrieve(callback: (error: any, result: CampaignModel[]) => void) {
        logger("campaign service - getting campaigns");
        this.campaignRepo.retrieve((err: any, res: ICampaignModel[]) => {
            let campaigns: CampaignModel[] = new Array();
            if (err) {
                logger(`retrieve error:\n${err}`);
            } else {
                res.forEach(c => {
                    let campaign: CampaignModel = new CampaignModel(
                        c._id
                        , c.name
                        , c.description
                        , c.logoUrl
                        , c.campaignId
                    );
                    campaigns.push(campaign);
                });
            }
            callback(err, campaigns);
        });
    }

    update(_id: string, item: ICampaignModel, callback: (error: any, result: any) => void) {
        throw new Error("do not implement.  Cmapaigns should not be updated.");
        // sample code of how to implement method.
        // logger(`_id: ${_id}\nitem: ${item}\n`);
        // this.campaignRepo.findById(_id, (err, res) => {
        //     if (err) {
        //         logger(`retrieve error:\n${err}`);
        //         callback(err, res);
        //     } else {
        //         logger(`found item id: ${res._id}\n`);
        //         this.campaignRepo.update(res._id, item, callback);
        //     }
        // });
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        throw new Error("do not implement.  Campaigns should not be deleted.");
        // sample of how to implement delete.
        // logger(`_id: ${_id}\n`);
        // this.campaignRepo.delete(_id, callback);
    }

    findById(_id: string, callback: (error: any, result: Optional<CampaignModel>) => void) {
        logger(`_id: ${_id}\n`);
        this.campaignRepo.findById(_id, (err: any, res: ICampaignModel) => {
            let campaign: Optional<CampaignModel> = undefined;
            if (err) {
                logger(`retrieve by id error:\n${err}\n`);
            } else {
                campaign = new CampaignModel(
                    res._id
                    , res.name
                    , res.description
                    , res.logoUrl
                    , res.campaignId
                );
            }
            callback(err, campaign);
        });
    }
}

Object.seal(CampaignService);