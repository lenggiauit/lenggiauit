import { BaseModel } from "../baseModel";

export type ProjectType  = BaseModel & {
    id: any,
    name: any, 
    isActive: boolean,
    totalRows: any
};
