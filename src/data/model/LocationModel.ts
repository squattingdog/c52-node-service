export class LocationModel {
    constructor (public zip: string,
                public street: string,
                public city: string,
                public state: null,
                public informataion: string,
                public geocode: number
    ) {}
}