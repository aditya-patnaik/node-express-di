import * as express from "express";
import {controller, httpPost, request, response} from 'inversify-express-utils';
import {Container, inject} from 'inversify';
import TYPES from "../constants/types";
import AppService from "../services/app.service";
import { SERVICE_RESPONSE_STATUS } from "../utils/app-utils";

export function AppControllerFactory(container: Container) {

    @controller('/app')
    class AppController {
        
        constructor(@inject(TYPES.AppService) private encyclopaediaService: AppService) {}

        @httpPost("/add-sample")
        public async addItem(@request() req: express.Request, @response() res: express.Response) {
            let serviceResponse = await this.encyclopaediaService.addSample(req.body)
            if (serviceResponse.status === SERVICE_RESPONSE_STATUS.SUCCESS) {
                res.json(serviceResponse.data)
            } else if (serviceResponse.status === SERVICE_RESPONSE_STATUS.FAILED) {
                res.status(500).json(serviceResponse.message)
            } else {
                res.status(500).json(serviceResponse.message)
            }
        }
    }

    return AppController
}