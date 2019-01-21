import { IShiftModel } from "./interfaces/IShiftModel";
import { LocationModel } from "./LocationModel";

export class ShiftModel implements IShiftModel {
    public endDateTime: Date;

    constructor(public name: string,
                public shiftId: string,
                public jobId: string,
                public description: string,
                public startDateTime: Date,
                public duration: number,
                public active: boolean,
                public numberOfVolunteersStillNeeded: number,
                public desiredNumberOfVolunteers: number,
                public totalVolunteers: number,
                public location: LocationModel) {

        // set endDateTime by adding the duration (in float hours) to the startTime.
        this.endDateTime = this.startDateTime;
        this.endDateTime.setMinutes(this.startDateTime.getMinutes() + duration * 60);
    }
}