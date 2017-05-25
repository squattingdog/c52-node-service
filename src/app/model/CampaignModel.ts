import { ICampaignModel } from "./interfaces/ICampaignModel";

export class CampaignModel {
    private _campaignModel: ICampaignModel;
    constructor(campaignModel: ICampaignModel) {
        this._campaignModel = campaignModel;
    }

    get sfid(): string {
        return this._campaignModel.sfid;
    }

    get name(): string {
        return this._campaignModel.name;
    }

    get description(): string {
        return this._campaignModel.description;
    }

    get logoUrl(): string {
        return this._campaignModel.logoUrl;
    }
}

Object.seal(CampaignModel);