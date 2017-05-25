import { IRead } from "../common/IRead";
import { IWrite } from "../common/IWrite";

export interface IBaseBusiness<T> extends IRead<T>, IWrite<T> { }