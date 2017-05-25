
export interface IRepository {
    getByKey(key: string): Promise<string>;
    insert(key: string, val: string): void;
}