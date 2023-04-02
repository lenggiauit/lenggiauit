'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRequest, ApiResponse, AppSetting } from "../types/type";
import { getLoggedUser } from '../utils/functions';
import { SiteSetting } from './communication/response/siteSetting';
import { Project } from './models/project';
let appSetting: AppSetting = require('../appSetting.json');

export const CloudFunctions = createApi({
    reducerPath: 'CloudFunctions',

    baseQuery: fetchBaseQuery({
        baseUrl: appSetting.BaseUrl,
        prepareHeaders: (headers) => {
            const currentUser = getLoggedUser();
            // Add token to headers
            if (currentUser && currentUser.accessToken) {
                headers.set('Authorization', `Bearer ${currentUser.accessToken}`);
            }
            // this code not working with Google cloud.. so 
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        SendContact: builder.mutation<ApiResponse<{}>, ApiRequest<{ name: any, email: any, subject: any, message: any }>>({
            query: (payload) => ({
                url: 'sendcontactv1',
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            transformResponse(response: ApiResponse<{}>) {
                return response;
            },
        }),
        UpdateSettings: builder.mutation<ApiResponse<{}>, ApiRequest<{ isOpenToWork: boolean, isMultiLanguage: boolean }>>({
            query: (payload) => ({
                url: 'updateSiteSettingV1',
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            transformResponse(response: ApiResponse<{}>) {
                return response;
            },
        }),
        GetSiteSettings: builder.query<ApiResponse<SiteSetting>, null>({
            query: (payload) => ({
                url: 'getSiteSettingsV1',
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            transformResponse(response: ApiResponse<SiteSetting>) {
                return response;
            },
        }),

        CreateEditProject: builder.mutation<ApiResponse<Project>, ApiRequest<{
            id: string,
            name: string,
            image: string,
            url: any,
            description: string,
            isArchived: boolean
        }>>({
            query: (payload) => ({
                url: 'createEditProjectV1',
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            transformResponse(response: ApiResponse<Project>) {
                return response;
            },
        }),

    })
});

export const
    {
        useSendContactMutation,
        useUpdateSettingsMutation,
        useGetSiteSettingsQuery,
        useCreateEditProjectMutation
    } = CloudFunctions;