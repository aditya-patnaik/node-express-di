import {Container} from "inversify";
import TYPES from "../constants/types";
import { interfaces } from "inversify-express-utils";
import AppService from "../services/app.service";
import { AppControllerFactory } from "../controllers/app.controller";
import { IBaseServerConfig } from "../utils/base-server";
import { TYPES as BaseServerTypes } from "../utils/base-server";
import { BaseServerConfig } from "../configs/base-server.config";
import { SampleRepositoryInterface } from "../interfaces/repositories";
import { SampleRepository } from "../repositories/sample.repository";

let container = new Container();
container.bind<IBaseServerConfig>(BaseServerTypes.BaseServerConfig).toConstantValue(BaseServerConfig);
container.bind<AppService>(TYPES.AppService).to(AppService);
container.bind<interfaces.Controller>(TYPES.AppController).to(AppControllerFactory(container)).inSingletonScope();
container.bind<SampleRepositoryInterface>(TYPES.SampleRepository).to(SampleRepository).inSingletonScope();

export default container;