import { IJobModel } from "./interfaces/IJobModel";

export class JobModel implements IJobModel {

    constructor(public jobId: string,
        public name: string,
        public description: string,
        public skills: string,
        public ongoing: boolean,
        public numberOfVolunteersStillNeeded: number,
        public nubmerOfShifts: number,
        public active: boolean,
        public location: {
            zip: string,
            street: string,
            city: string,
            state: null,
            informataion: string,
            geocode: number
        },
        public campaignId: string,
        public displayOnWebsite: boolean) {
    }
}

Object.seal(JobModel);