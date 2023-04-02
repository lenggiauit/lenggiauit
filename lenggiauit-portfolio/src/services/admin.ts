import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRequest, ApiResponse, AppSetting } from "../types/type";
import { getLoggedUser } from '../utils/functions';
import * as FormDataFile from "form-data";
import { Category } from './models/admin/category';
import { BlogPost } from './models/admin/blogPost';
import { Tag } from './models/tag';
import { EventBookingDate } from './models/admin/eventBookingDate';
import { ResultCode } from '../utils/enums';
import { PrivateTalk } from './models/admin/privateTalk';
import { EventBookingDateResource } from './resources/eventBookingDateResource';
import { MockInterview } from './models/admin/mockInterview';
import { User } from './models/user';
import { UserResource } from './resources/userResource';
import { FileSharing } from './models/admin/fileSharing';
import { FeedbackResource } from './resources/feedbackResource';
import { SiteSetting } from './communication/response/siteSetting'; 
import { Project } from './models/admin/project';
import { ProjectType } from './models/admin/projectType';
import { Contact } from './models/admin/contact';

let appSetting: AppSetting = require('../appSetting.json');

export const AdminService = createApi({
    reducerPath: 'AdminService',

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
        GetCategory: builder.mutation<ApiResponse<Category[]>, ApiRequest<{ isArchived: boolean }>>({
            query: (payload) => ({
                url: 'admin/getCategory',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<Category[]>) {
                return response;
            },
        }),

        GetQueryCategory: builder.query<ApiResponse<Category[]>, ApiRequest<{ isArchived: boolean }>>({
            query: (payload) => ({
                url: 'admin/getCategory',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<Category[]>) {
                return response;
            },
        }),

        CreateEditCategory: builder.mutation<ApiResponse<Category>, ApiRequest<{ id: any, name: any, color: any, description: any, isArchived: boolean }>>({
            query: (payload) => ({
                url: 'admin/createEditCategory',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<Category>) {
                return response;
            },
        }),

        GetBlogPost: builder.mutation<ApiResponse<BlogPost[]>, ApiRequest<{ keywords: any, isAll?: boolean, isPublic?: boolean, isDraft?: boolean, isArchived: boolean }>>({
            query: (payload) => ({
                url: 'admin/getBlogPost',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<BlogPost[]>) {
                return response;
            },
        }),

        CreateEditBlogPost: builder.mutation<ApiResponse<BlogPost>,
            ApiRequest<{
                id: any,
                title: any,
                thumbnail: any,
                categoryId: any,
                shortDescription: any,
                content: any,
                tags: any[],
                isPublic: boolean,
                isDraft: boolean,
                isArchived: boolean
            }>
        >({
            query: (payload) => ({
                url: 'admin/createEditBlogPost',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<BlogPost>) {
                return response;
            },
        }),

        UpdateBlogPostStatus: builder.mutation<ApiResponse<Category>, ApiRequest<{ id: any, status: any }>>({
            query: (payload) => ({
                url: 'admin/updateBlogPostStatus',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<Category>) {
                return response;
            },
        }),
        GetUserList: builder.mutation<ApiResponse<UserResource[]>, ApiRequest<{}>>({
            query: (payload) => ({
                url: 'admin/GetUserList',
                method: 'POST',
                body: payload
            }),
            transformResponse(response: ApiResponse<UserResource[]>) {
                return response;
            },
        }),

        GetAdminFileSharing: builder.mutation<ApiResponse<FileSharing[]>, ApiRequest<{ keywords: any }>>({
            query: (payload) => ({
                url: 'admin/GetFileSharing',
                method: 'POST',
                body: payload
            }),
            transformResponse(response: ApiResponse<FileSharing[]>) {
                return response;
            },
        }),

        CreateEditFileSharing: builder.mutation<ApiResponse<FileSharing>, ApiRequest<{ id: any, name: any, category: any, url: any, isArchived: boolean }>>({
            query: (payload) => ({
                url: 'admin/AddUpdateFileSharing',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<FileSharing>) {
                return response;
            },
        }),

        UpdateSiteSettings: builder.mutation<ApiResponse<ResultCode>, ApiRequest<{ isOpenToWork: boolean, isMultiLanguage: boolean }>>({
            query: (payload) => ({
                url: 'admin/UpdateSiteSettings',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<ResultCode>) {
                return response;
            },
        }),
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
        CreateEditProjectType: builder.mutation<ApiResponse<ProjectType>, ApiRequest<{ id: any,
            name: any,
            isActive: boolean  }>>({
            query: (payload) => ({
                url: 'admin/CreateEditProjectType',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<ProjectType>) {
                return response;
            },
        }),
        CreateEditProject: builder.mutation<ApiResponse<Project>, ApiRequest<{ id: any,
            name: any,
            image: any, 
            link: any,
            description: string,
            isPublic: boolean,
            projectTypeId: any,
            technologies: any  }>>({
            query: (payload) => ({
                url: 'admin/CreateEditProject',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<Project>) {
                return response;
            },
        }),
        GetProjectList: builder.mutation<ApiResponse<Project[]>, ApiRequest<{ projectTypeId: any, isPublish : any}>>({
            query: (payload) => ({
                url: 'admin/GetProjectList',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<Project[]>) {
                return response;
            },
        }),
        GetProjectTypeList: builder.mutation<ApiResponse<ProjectType[]>, ApiRequest<{ isActive : any}>>({
            query: (payload) => ({
                url: 'admin/GetProjectTypeList',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<ProjectType[]>) {
                return response;
            },
        }),
        GetContactList: builder.mutation<ApiResponse<Contact[]>, ApiRequest<{ isArchived: boolean }>>({
            query: (payload) => ({
                url: 'admin/GetContactList',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<Contact[]>) {
                return response;
            },
        }),
        ArchiveContact: builder.mutation<ApiResponse<ResultCode>, ApiRequest<any>>({
            query: (payload) => ({
                url: 'admin/ArchiveContact',
                method: 'post',
                body: payload
            }),
            transformResponse(response: ApiResponse<ResultCode>) {
                return response;
            },
        }),

    })
});

export const { useGetCategoryMutation,
    useCreateEditCategoryMutation,
    useGetBlogPostMutation,
    useCreateEditBlogPostMutation,
    useGetQueryCategoryQuery,
    useUpdateBlogPostStatusMutation,
    useGetUserListMutation,
    useGetAdminFileSharingMutation,
    useCreateEditFileSharingMutation,
    useUpdateSiteSettingsMutation,
    useGetSiteSettingsMutation,
    useCreateEditProjectMutation,
    useGetProjectListMutation,
    useGetProjectTypeListMutation,
    useCreateEditProjectTypeMutation,
    useGetContactListMutation,
    useArchiveContactMutation
} = AdminService;