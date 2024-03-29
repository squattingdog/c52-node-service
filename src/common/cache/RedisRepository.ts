﻿import debug from "debug";
let logger = debug("c52::common::cache::CacheRepository");
logger("logging for CacheRepository");

// import { IRepository } from "./interfaces/IRepository";
import { RedisProvider } from "./providers/RedisProvider";
import { CacheRepositoryBase } from "./base/CacheRepositoryBase";

export class RedisRepository extends CacheRepositoryBase<RedisProvider> {

    constructor() {
        super(new RedisProvider());
    }
}

export default new RedisRepository();