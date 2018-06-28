import debug from "debug";
let logger = debug("c52::app::data::service::JobService");
logger("logging for JobService");

import { Optional } from "../../../typings/globals";
import { IJobService } from "./interfaces/IJobService";
import { JobRepository } from "../repository/JobRepository";
import { IJobModel } from "../model/interfaces/IJobModel";
import { JobModel } from "../model/JobModel";

export class JobService implements IJobService {
    private jobRepo: JobRepository;

    constructor() {
        this.jobRepo = new JobRepository();
    }

    create(item: IJobModel, callback: (error: any, result: any) => void) {
        throw new Error("do not implement.  Campaigns should not be created.");
        // logger(`item: ${item}\n`);
        // this.campaignRepo.create(item, callback);
    }

    retrieve(callback: (error: any, result: JobModel[]) => void) {
        logger("campaign service - getting campaigns");
        this.jobRepo.retrieve((err: any, res: IJobModel[]) => {
            let jobs: JobModel[] = new Array();
            if (err) {
                logger(`retrieve error:\n${err}`);
            } else {
                res.forEach(j => {
                    let job: JobModel = new JobModel(
                        j.jobId
                        , j.name
                        , j.description
                        , j.skills
                        , j.ongoing
                        , j.numberOfVolunteersStillNeeded
                        , j.nubmerOfShifts
                        , j.active
                        , j.location
                        , j.campaignId
                        , j.displayOnWebsite
                    );
                    jobs.push(job);
                });
            }
            callback(err, jobs);
        });
    }

    update(_id: string, item: IJobModel, callback: (error: any, result: any) => void) {
        throw new Error("do not implement.  Cmapaigns should not be updated.");
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        throw new Error("do not implement.  Campaigns should not be deleted.");
    }

    findById(_id: string, callback: (error: any, result: Optional<JobModel>) => void) {
        logger(`_id: ${_id}\n`);
        this.jobRepo.findById(_id, (err: any, j: IJobModel) => {
            let job: Optional<JobModel> = undefined;
            if (err) {
                logger(`retrieve by id error:\n${err}\n`);
            } else {
                job = new JobModel(
                    j.jobId
                    , j.name
                    , j.description
                    , j.skills
                    , j.ongoing
                    , j.numberOfVolunteersStillNeeded
                    , j.nubmerOfShifts
                    , j.active
                    , j.location
                    , j.campaignId
                    , j.displayOnWebsite
                );
            }
            callback(err, job);
        });
    }

    findByCampaignId(campaignId: string, callback: (error: any, result: JobModel[]) => void) {
        this.jobRepo.getJobsByCampaignId(campaignId, (err: any, res: IJobModel[]) => {
            logger(`findByCampaignId results: ${res}`);
            let jobs: JobModel[] = new Array();
            if (err) {
                logger(`findByCampaignId error: ${err}`);
            } else {
                res.forEach(j => {
                    let job: JobModel = new JobModel(
                        j.jobId
                        , j.name
                        , j.description
                        , j.skills
                        , j.ongoing
                        , j.numberOfVolunteersStillNeeded
                        , j.nubmerOfShifts
                        , j.active
                        , j.location
                        , j.campaignId
                        , j.displayOnWebsite
                    );
                    jobs.push(job);
                });
            }
            callback(err, jobs);
        });
    }
}

Object.seal(JobService);