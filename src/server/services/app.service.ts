import {inject, injectable} from "inversify";
import TYPES from "../constants/types";
import { SampleRepositoryInterface } from "../interfaces/repositories";
import { ISample } from "../models/ISample";
import AppUtils, { SERVICE_RESPONSE_STATUS } from "../utils/app-utils";

@injectable()
export default class AppService {
    constructor(@inject(TYPES.SampleRepository) private _sampleRep: SampleRepositoryInterface) {}

    public async addSample(item: ISample) {
        try {
            let result = await this._sampleRep.save(item)
            return AppUtils.createGenericServiceResponseObj(result, SERVICE_RESPONSE_STATUS.SUCCESS, null)
        } catch(e) {
            return AppUtils.createGenericServiceResponseObj(e, SERVICE_RESPONSE_STATUS.FAILED, "")
        }

    }
}