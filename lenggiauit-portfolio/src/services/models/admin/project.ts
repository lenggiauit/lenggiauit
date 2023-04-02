import { BaseModel } from "../baseModel";
import { ProjectType } from "./projectType";

export type Project = BaseModel & {
    id: any,
    name: any,
    link: any,
    image: any, 
    technologies: any,
    projectType: ProjectType,
    url: any,
    description: string,
    isPublic: boolean,
    totalRows: any
};
