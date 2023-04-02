using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Domain.Helpers;
using Lenggiauit.API.Domain.Services.Communication.Request;
using Lenggiauit.API.Domain.Services.Communication.Request.Admin;
using Lenggiauit.API.Resources;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BlogPostFilterRequest = Lenggiauit.API.Domain.Services.Communication.Request.Admin.BlogPostFilterRequest;

namespace Lenggiauit.API.Domain.Services
{
    public interface IAdminService
    {
        Task<(List<Category>, ResultCode)> GetCategory(BaseRequest<CategoryFilterRequest> request);
        Task<ResultCode> CheckCategoryName(string name, Guid? categoryid);
        Task<(Category, ResultCode)> CreateEditCategory(BaseRequest<CreateEditCategoryRequest> request, Guid userId);
        Task<(List<BlogPost>, ResultCode)> GetBlogPost(BaseRequest<BlogPostFilterRequest> request);
        Task<ResultCode> CheckBlogPostTitle(string title, Guid? blogPostId);
        Task<(BlogPost, ResultCode)> CreateEditBlogPost(BaseRequest<CreateEditBlogPostRequest> request, Guid userId);
        Task<ResultCode> UpdateBlogPostStatus(BaseRequest<UpdateBlogPostStatusRequest> request, Guid userId); 
        Task<(List<User>, ResultCode)> GetUserList();
        Task<ResultCode> UpdateSiteSettings(BaseRequest<UpdateSiteSettingRequest> request, Guid userId);
        Task<(List<Project>, ResultCode)> GetProjectList(BaseRequest<GetProjectListRequest> request, Guid userId);
        Task<(List<ProjectType>, ResultCode)> GetProjectTypeList(BaseRequest<GetProjectTypeListRequest> request);
        Task<(Project, ResultCode)> CreateEditProject(BaseRequest<CreateEditProjectRequest> request, Guid userId);
        Task<(ProjectType, ResultCode)> CreateEditProjectType(BaseRequest<CreateEditProjectTypeRequest> request, Guid userId);
        Task<(List<Contact>, ResultCode)> GetContactList(BaseRequest<GetContactListRequest> request);
        Task<ResultCode> ArchiveContact(Guid id);
    }
}
