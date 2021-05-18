import { Cluster, Worker } from "cluster";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import * as morgan from "morgan";
import * as uuid from "node-uuid";
import { NextFunction } from "express";
var cluster: Cluster = require("cluster");

interface IBaseServerTypes {
    BaseServerConfig: symbol;
}

export const TYPES: IBaseServerTypes = {
    BaseServerConfig: Symbol.for('BaseServerConfig')
}

export interface IBaseServerConfig {
    clusterMode: Boolean;
    enableLogger: Boolean;
}

export interface IBaseServer {
    readonly appFactory: (app: Express.Application, cluster: Cluster) => Express.Application;
    readonly container: Container;
    readonly serverConfig: (app: Express.Application) => void;

    run: () => void;
}

export default class BaseServer implements IBaseServer {
    public readonly appFactory: (app: Express.Application, cluster: Cluster) => Express.Application;
    public readonly container: Container;
    public readonly serverConfig: (app: Express.Application) => void;
    public readonly baseServerConfig: IBaseServerConfig;

    constructor(appFactory: (app: Express.Application, cluster: Cluster) => Express.Application,
                container: Container,
                serverConfig: (app: Express.Application) => void) {
        this.appFactory = appFactory;
        this.container = container;
        this.serverConfig = serverConfig;
        this.baseServerConfig = container.get(TYPES.BaseServerConfig);
    }

    private onFork() {
        cluster.on('fork', function(worker: Worker) {
            console.log('forked -> Worker %d', worker.id);
        });
    }

    private assignId(req: Express.Request, res: Express.Response, next: NextFunction) {
        (req as any).id = uuid.v4()
        next()
    }

    private spawnProcess() {
        let server: InversifyExpressServer = new InversifyExpressServer(this.container);
        server.setConfig(this.serverConfig);

        let app = server.build();

        if (this.baseServerConfig.enableLogger) {
            morgan.token('id', function getId (req: any) {
                return req.id
            })
    
            app.use(this.assignId)
            app.use(morgan(`${this.baseServerConfig.clusterMode ? `Worker-${cluster.worker.id}` : ``} :id :method :url :response-time`))
        }

        this.appFactory(app, cluster);
    }

    public run() {
        if (this.baseServerConfig.clusterMode) {

            // If clustering is enabled, the processes are forked here
            if(cluster.isMaster) {
                // Check the number of cores on the CPU
                var cpuCount = require('os').cpus().length;
                for (var i = 0; i < cpuCount; i += 1) {
                    // Fork the process for every core
                    cluster.fork();
                }
            } else {
                this.spawnProcess();
            }
            
            this.onFork();

        } else {
            // If clustering is disabled, the process is run on one thread only
            this.spawnProcess();
        }
    }
}