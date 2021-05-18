import { inject, injectable } from "inversify";
import { DbClient } from "../clients/DBClient";
import TYPES from "../constants/types";
import { SampleRepositoryInterface } from "../interfaces/repositories";
import { ISample } from "../models/ISample";
import { GenericRepository } from "./generic.repository";

export interface SampleModel extends ISample, Document {}

@injectable()
//@ts-ignore
export class SampleRepository extends GenericRepository<ISample, SampleModel> implements SampleRepositoryInterface {
        public constructor(@inject(TYPES.DBClient) dbClient: DbClient) {
            super(dbClient, "sample", {
                name: String,
                altName: String,
                type: String
            });
        }
}