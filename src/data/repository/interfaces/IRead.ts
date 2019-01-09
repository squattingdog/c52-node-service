export interface IRead<T> {
    retrieve: (callback: (error: any, result: T[]) => void) => void;
    findById: (id: string, callback: (error: any, result: T) => void) => void;
}