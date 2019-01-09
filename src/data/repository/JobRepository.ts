import debug from "debug";
let logger = debug("c52::app::data::repository::JobRepository");
logger("logging for job repository");

import { RepositoryBase } from "./base/RepositoryBase";
import { IJobModel } from "../model/interfaces/IJobModel";
import JobSchema from "../dataAccess/schemas/JobSchema";

export class JobRepository extends RepositoryBase<IJobModel> {
    constructor() {
        super(JobSchema);
    }

    getJobsByCampaignId(campaignId: string, callback: (error: any, result: IJobModel[]) => void) {
        logger(`the campaignId: ${campaignId}`);
        super.model.find({ campaignId: campaignId }, callback);
    }
}

Object.seal(JobRepository);