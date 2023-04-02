import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRequest, ApiResponse, AppSetting } from "../types/type";
import { ResultCode } from '../utils/enums';
import { getLoggedUser } from '../utils/functions';
import { FeedbackResource } from './resources/feedbackResource';

import { YoutubeVideoResource } from './resources/youtubeVideoResource';
import { SiteSetting } from './communication/response/siteSetting';



let appSetting: AppSetting = require('../appSetting.json');

export const HomeService = createApi({
    reducerPath: 'HomeService',

    baseQuery: fetchBaseQuery({
        baseUrl: appSetting.BaseUrl,
        prepareHeaders: (headers) => {
            // const currentUser = getLoggedUser();
            // // Add token to headers
            // if (currentUser && currentUser.accessToken) {
            //     headers.set('Authorization', `Bearer ${currentUser.accessToken}`);
            // }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        GetSiteSettings: builder.mutation<ApiResponse<SiteSetting>, null>({
            query: (payload) => ({
                url: 'home/getSiteSettings',
                method: 'POST',
                body: JSON.stringify(payload)
            }),
            transformResponse(response: ApiResponse<SiteSetting>) {
                return response;
            },
        }),
        SendContact: builder.mutation<ApiResponse<{}>, ApiRequest<{
            name: any,
            email: any,
            subject: any,
            message: any
        }>>({
            query: (payload) => ({
                url: 'contact/SendContact',
                method: 'POST',
                body: payload
            }),
            transformResponse(response: ApiResponse<{}>) {
                return response;
            },
        }),

    })
});


export const { useGetSiteSettingsMutation, useSendContactMutation } = HomeService;