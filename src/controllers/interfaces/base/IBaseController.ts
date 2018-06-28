import { IReadController } from "../common/IReadController";
import { IWriteController } from "../common/IWriteController";
import { IBaseService } from "../../../data/service/interfaces/base/IBaseService";
// import { IModelBase } from "../../../data/model/base/IModelBase";

export interface IBaseController<T extends IBaseService<any>> extends IReadController, IWriteController { }
