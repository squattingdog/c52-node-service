//import * as Bluebird from 'bluebird';
import * as Promise from 'promise';

declare module 'mongoose' {
    //type Promise<T> = Bluebird<T>;
    type Promise<T> = Promise.IPromise;
}

declare module "redis" {
    export interface RedisClient extends NodeJS.EventEmitter {
        setAsync(key: string, value: string): Promise<void>;
        getAsync(key: string): Promise<string>;
    }
}