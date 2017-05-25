import { ICacheProvider } from "../providers/interfaces/ICacheProvider";
import { IRepository } from "../interfaces/IRepository";

export class CacheRepositoryBase<T extends ICacheProvider> implements IRepository {
    private cacheProvider: T;
    private client: any;

    constructor(provider: T) {
        this.cacheProvider = provider;
        this.client = this.cacheProvider.getClient();
    }

    public getByKey(key: string): Promise<string> {
        return this.client.getAsync(key)
            .then(function (res) {
                return res;
            });
    }

    public insert(key: string, val: string): void {
        this.client.set(key, val);
    }
}

