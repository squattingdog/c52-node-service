import { ICampaignModel } from "../model/interfaces/ICampaignModel";
import CampaignSchema from "../dataAccess/schemas/CampaignSchema";
import { RepositoryBase } from "./base/RepositoryBase";

export class CampaignRepository extends RepositoryBase<ICampaignModel> {
    constructor() {
        super(CampaignSchema);
    }
}

Object.seal(CampaignRepository);