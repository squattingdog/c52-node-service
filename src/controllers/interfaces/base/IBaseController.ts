import { IReadController } from "../common/IReadController";
import { IWriteController } from "../common/IWriteController";
import { IBaseService } from "../../../data/service/interfaces/base/IBaseService";

export interface IBaseController<T extends IBaseService<Object>> extends IReadController, IWriteController { }