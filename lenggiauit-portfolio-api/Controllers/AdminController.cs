using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Domain.Helpers;
using Lenggiauit.API.Domain.Services;
using Lenggiauit.API.Domain.Services.Communication.Request;
using Lenggiauit.API.Domain.Services.Communication.Request.Admin;
using Lenggiauit.API.Domain.Services.Communication.Response;
using Lenggiauit.API.Infrastructure;
using Lenggiauit.API.Resources;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BlogPostFilterRequest = Lenggiauit.API.Domain.Services.Communication.Request.Admin.BlogPostFilterRequest;

namespace Lenggiauit.API.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class AdminController : BaseController
    {
        private readonly IAdminService _adminServices;
        private readonly IFileService _fireServices;
        private readonly IHttpClientFactoryService _httpClientFactoryService;
        private readonly ILogger<AdminController> _logger;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;
        public AdminController(
            ILogger<AdminController> logger,
            IMapper mapper,
            IAdminService adminService,
            IFileService fireServices,
            IHttpClientFactoryService httpClientFactoryService,
            IOptions<AppSettings> appSettings)
        {
            _adminServices = adminService;
            _fireServices = fireServices;
            _httpClientFactoryService = httpClientFactoryService;
            _logger = logger;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        /// <summary>
        /// Get category
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("GetCategory")]
        public async Task<BaseResponse<List<Category>>> GetCategory(BaseRequest<CategoryFilterRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<List<Category>>(await _adminServices.GetCategory(request));
            }
            else
            {
                return new BaseResponse<List<Category>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        /// <summary>
        /// Check Category Name exist or not
        /// </summary>
        /// <param name="name"></param>
        /// <param name="categoryid"></param>
        /// <returns></returns>
        [HttpGet("CheckCategoryName")]
        public async Task<BaseResponse<ResultCode>> CheckCategoryName(string name, Guid? categoryid)
        {
            if (!string.IsNullOrEmpty(name))
            {
                var result = await _adminServices.CheckCategoryName(name, categoryid);
                return new BaseResponse<ResultCode>(result);
            }
            else
            {
                return new BaseResponse<ResultCode>(ResultCode.Invalid);
            }
        }

        /// <summary>
        /// Edit Category
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Permissions(PermissionConstant.CreateEditCategory)]
        [HttpPost("CreateEditCategory")]
        public async Task<BaseResponse<Category>> CreateEditCategory(BaseRequest<CreateEditCategoryRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<Category>(await _adminServices.CreateEditCategory(request, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<Category>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        /// <summary>
        /// Get blog post
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("GetBlogPost")]
        public async Task<BaseResponse<List<BlogPost>>> GetBlogPost(BaseRequest<BlogPostFilterRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<List<BlogPost>>(await _adminServices.GetBlogPost(request));
            }
            else
            {
                return new BaseResponse<List<BlogPost>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        /// <summary>
        /// Check BlogPost Title is valid or not
        /// </summary>
        /// <param name="title"></param>
        /// <param name="blogPostId"></param>
        /// <returns></returns>
        [HttpGet("CheckBlogPostTitle")]
        public async Task<BaseResponse<ResultCode>> CheckBlogPostTitle(string title, Guid? blogPostId)
        {
            if (!string.IsNullOrEmpty(title))
            {
                var result = await _adminServices.CheckBlogPostTitle(title, blogPostId);
                return new BaseResponse<ResultCode>(result);
            }
            else
            {
                return new BaseResponse<ResultCode>(ResultCode.Invalid);
            }
        }

        /// <summary>
        /// Create Edit Blog Post
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Permissions(PermissionConstant.CreateEditBlogPost)]
        [HttpPost("CreateEditBlogPost")]
        public async Task<BaseResponse<BlogPost>> CreateEditBlogPost(BaseRequest<CreateEditBlogPostRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<BlogPost>(await _adminServices.CreateEditBlogPost(request, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<BlogPost>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        /// <summary>
        /// Update Blog Post Status
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Permissions(PermissionConstant.CreateEditBlogPost)]
        [HttpPost("UpdateBlogPostStatus")]
        public async Task<BaseResponse<ResultCode>> UpdateBlogPostStatus(BaseRequest<UpdateBlogPostStatusRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<ResultCode>(await _adminServices.UpdateBlogPostStatus(request, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        /// <summary>
        /// Get User List
        /// </summary>
        /// <returns></returns>
        [Permissions(PermissionConstant.ManageUser)] 
        [HttpPost("GetUserList")]
        public async Task<BaseResponse<List<UserListResource>>> GetUserList()
        {
            if (ModelState.IsValid)
            {
                var (data, resultCode) = await _adminServices.GetUserList();
                if (data != null)
                {
                    return new BaseResponse<List<UserListResource>>(_mapper.Map<List<User>, List<UserListResource>>(data));
                }
                else
                {
                    return new BaseResponse<List<UserListResource>>(Constants.ErrorMsg, resultCode);
                }
            }
            else
            {
                return new BaseResponse<List<UserListResource>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        /// <summary>
        /// Add Update File Sharing
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Permissions(PermissionConstant.ManageFileSharing)]
        [HttpPost("AddUpdateFileSharing")]
        public async Task<BaseResponse<(FileSharing, ResultCode)>> AddUpdateFileSharing(BaseRequest<AddUpdateFileSharingRequest> request)
        {

            if (ModelState.IsValid)
            {
                return new BaseResponse<(FileSharing, ResultCode)>(await _fireServices.AddUpdateFileSharing(request, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<(FileSharing, ResultCode)>(Constants.InvalidMsg, ResultCode.Invalid);
            } 
        }

        /// <summary>
        /// Get File Sharing
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Permissions(PermissionConstant.ManageFileSharing)]
        [HttpPost("GetFileSharing")]
        public async Task<BaseResponse<List<FileSharing>>> GetFileSharing(BaseRequest<FileSharingSearchRequest> request)
        {
            if (ModelState.IsValid)
            {
                var (data, resultCode) = await _fireServices.GetAdminFileSharing(request, GetCurrentUserId());
                return new BaseResponse<List<FileSharing>>(data);
            }
            else
            {
                return new BaseResponse<List<FileSharing>>(Constants.InvalidMsg, ResultCode.Invalid);
            }

        }

        /// <summary>
        /// Remove File Sharing
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Permissions(PermissionConstant.ManageFileSharing)]
        [HttpPost("RemoveFileSharing")]
        public async Task<BaseResponse<ResultCode>> RemoveFileSharing(BaseRequest<RequestId> request)
        {

            if (ModelState.IsValid)
            {
                return new BaseResponse<ResultCode>(await _fireServices.RemoveFileSharing(request, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            } 
        }

        /// <summary>
        /// Create Edit Project Type
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Permissions(PermissionConstant.Admin)]
        [HttpPost("CreateEditProjectType")]
        public async Task<BaseResponse<ProjectType>> CreateEditProjectType(BaseRequest<CreateEditProjectTypeRequest> request)
        {

            if (ModelState.IsValid)
            {
                return new BaseResponse<ProjectType>(await _adminServices.CreateEditProjectType(request, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<ProjectType>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        /// <summary>
        /// Create Edit Project
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Permissions(PermissionConstant.Admin)]
        [HttpPost("CreateEditProject")]
        public async Task<BaseResponse<Project>> CreateEditProject(BaseRequest<CreateEditProjectRequest> request)
        { 
            if (ModelState.IsValid)
            {
                return new BaseResponse<Project>(await _adminServices.CreateEditProject(request, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<Project>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        /// <summary>
        /// Update Site Settings
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Permissions(PermissionConstant.Admin)]
        [HttpPost("UpdateSiteSettings")]
        public async Task<BaseResponse<ResultCode>> UpdateSiteSettings(BaseRequest<UpdateSiteSettingRequest> request)
        {

            if (ModelState.IsValid)
            {
                return new BaseResponse<ResultCode>(await _adminServices.UpdateSiteSettings(request, GetCurrentUserId()));
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        /// <summary>
        /// Get Project List
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Permissions(PermissionConstant.Admin)]
        [HttpPost("GetProjectList")]
        public async Task<BaseResponse<List<Project>>> GetProjectList(BaseRequest<GetProjectListRequest> request)
        { 
            if (ModelState.IsValid)
            {
                var (data, resultCode) = await _adminServices.GetProjectList(request, GetCurrentUserId());
                return new BaseResponse<List<Project>>(data); 
            }
            else
            {
                return new BaseResponse<List<Project>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        /// <summary>
        /// Get Project Type List
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [Permissions(PermissionConstant.Admin)]
        [HttpPost("GetProjectTypeList")]
        public async Task<BaseResponse<List<ProjectType>>> GetProjectTypeList(BaseRequest<GetProjectTypeListRequest> request)
        {
            if (ModelState.IsValid)
            {
                var (data, resultCode) = await _adminServices.GetProjectTypeList(request);
                return new BaseResponse<List<ProjectType>>(data);
            }
            else
            {
                return new BaseResponse<List<ProjectType>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [Permissions(PermissionConstant.Admin)]
        [HttpPost("GetContactList")]
        public async Task<BaseResponse<List<Contact>>> GetContactList(BaseRequest<GetContactListRequest> request)
        {
            if (ModelState.IsValid)
            {
                var (data, resultCode) = await _adminServices.GetContactList(request);
                return new BaseResponse<List<Contact>>(data);
            }
            else
            {
                return new BaseResponse<List<Contact>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [Permissions(PermissionConstant.Admin)]
        [HttpPost("ArchiveContact")]
        public async Task<BaseResponse<ResultCode>> ArchiveContact(BaseRequest<Guid> request)
        {
            if (ModelState.IsValid)
            { 
                return new BaseResponse<ResultCode>(await _adminServices.ArchiveContact(request.Payload));
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }


        





    }
}
