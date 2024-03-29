﻿import { ICampaignModel } from "./interfaces/ICampaignModel";

export class CampaignModel implements ICampaignModel {

    constructor(public mid: string
                , public name: string
                , public description: string
                , public logoUrl: string
                , public campaignId: string) {
    }
}

Object.seal(CampaignModel);