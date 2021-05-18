import 'reflect-metadata';
import * as express from "express"
import * as cookieParser from "cookie-parser"
import {PORT} from "./configs/configs"
import container from "./ioc/ioc"
import BaseServer from './utils/base-server'
import DBClient, { DbClient } from './clients/DBClient';
import TYPES from './constants/types';

async function bootstrap() {
    let serverConfig = (app: any)  => {
        // app configurations
        app.use(express.json({ limit: '5mb' }))
        app.use(express.urlencoded({ extended: true }))
        app.use(cookieParser())
    }
    
    let AppFactory = (app: any) => {
        app.get("*", (req: any, res: any) => {
            res.send("Please send a valid request");
        })
    
        let instance = app.listen(PORT);
    
        console.log(`Server started on port ${PORT}`);
    
        return instance;
    }

    let dbClient = await new DBClient().init()
    container.bind<DbClient>(TYPES.DBClient).toConstantValue(dbClient)
    
    let baseServer = new BaseServer(AppFactory, container, serverConfig);
    
    baseServer.run();
}

bootstrap()