import { IRead } from "../common/IRead";
import { IWrite } from "../common/IWrite";

export interface IBaseService<T> extends IRead<T>, IWrite<T> { }