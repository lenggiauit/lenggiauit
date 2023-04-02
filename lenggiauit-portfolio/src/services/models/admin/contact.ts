import { BaseModel } from "../baseModel";

export type Contact = BaseModel & {
    id: any;
    name: any; 
    email: any;
    subject: any;
    message: any;  
    totalRows: any;
};