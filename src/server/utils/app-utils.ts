export enum SERVICE_RESPONSE_STATUS {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    ERROR = "ERROR",
    UNAUTHORIZED = "UNAUTHORIZED"
}

export interface IGenericServiceResponse {
    data: unknown,
    status: SERVICE_RESPONSE_STATUS,
    message: any
}

export default class AppUtils {
    static createGenericServiceResponseObj(responseObj: any, status: SERVICE_RESPONSE_STATUS, message: any): IGenericServiceResponse {
        return { data: responseObj, status, message }
    }
}