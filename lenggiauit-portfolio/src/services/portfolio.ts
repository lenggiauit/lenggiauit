import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRequest, ApiResponse, AppSetting } from "../types/type";
import { ResultCode } from '../utils/enums';
import { getLoggedUser } from '../utils/functions';  
import { SiteSetting } from './communication/response/siteSetting';
import { Project } from './models/project';
import { ProjectType } from './models/projectType';
 
 
 
let appSetting: AppSetting = require('../appSetting.json');

export const PortfolioService = createApi({
    reducerPath: 'PortfolioService',

    baseQuery: fetchBaseQuery({
        baseUrl: appSetting.BaseUrl,
        prepareHeaders: (headers) => {
            const currentUser = getLoggedUser();
            // Add token to headers
            if (currentUser && currentUser.accessToken) {
                headers.set('Authorization', `Bearer ${currentUser.accessToken}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({ 
        GetProjectList: builder.mutation<ApiResponse<Project[]>, ApiRequest<{ projectTypeId?: any}>>({
            query: (payload) => ({
                url: 'portfolio/GetProjectList',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<Project[]>) {
                return response;
            },
        }),
        GetProjectTypeList: builder.mutation<ApiResponse<ProjectType[]>, ApiRequest<{ }>>({
            query: (payload) => ({
                url: 'portfolio/GetProjectTypeList',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<ProjectType[]>) {
                return response;
            },
        }),
        GetProjectDetail: builder.query<ApiResponse<Project>, ApiRequest<{ url: any}>>({
            query: (payload) => ({
                url: 'portfolio/GetProjectDetail',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<Project>) {
                return response;
            },
        }),
 
    })
});


export const { useGetProjectListMutation, useGetProjectTypeListMutation, useGetProjectDetailQuery } = PortfolioService;