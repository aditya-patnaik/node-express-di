import { injectable } from "inversify"
import * as mongoose from "mongoose"
import { DB_HOST, DB_NAME, DB_PORT, DB_USERNAME, DB_PASSWORD } from "../configs/configs"

export type DbClient = mongoose.Mongoose;

@injectable()
class DBClient {
    public _dbClient: mongoose.Mongoose

    constructor() {}

    public async init() {
        if (!this._dbClient) {
            const connString = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
            
            try {
                mongoose.connect(connString)

                console.log("Db conenction success:", "`mongodb://" + DB_HOST + ":" + DB_PORT + "/" + DB_NAME)
                this._dbClient = mongoose
                return this._dbClient
            } catch(err) {
                console.error("Db conenction error:", err)
            }
        }
    }

    public getDbClient() {
        return this._dbClient
    }
}

export default DBClient