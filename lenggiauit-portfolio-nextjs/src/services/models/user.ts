import { Permission } from "./permission";
import { Role } from "./role";

export type User = {
    id: any,
    name: any,
    fullName?: any, 
    role: Role,
    accessToken: any,
    email: any,
    isActive: any, 
};
