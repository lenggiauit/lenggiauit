 
import { ResultCode } from "../utils/enums";

export interface Dictionary<T> {
    [Key: string]: T;
}

export interface AppSetting {
    SiteUrl: any,
    BaseUrl: any;
    GoogleClientId: any;
    PageSize: number
}

export type ApiResponse<T> = {
    resultCode: ResultCode,
    message: any,
    resource: T,
};

export type ApiRequest<T> = {
    metaData?: MetaData,
    payload: T
};

export type Paging = {
    index: number;
    size: number;
}

export type MetaData = {
    paging: Paging,
    sortBy?: string[] 
}

export type LoginFormValues ={
    username: string;
    password: string;
}

 








