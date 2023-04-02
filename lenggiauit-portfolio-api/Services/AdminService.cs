using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Domain.Helpers;
using Lenggiauit.API.Domain.Repositories;
using Lenggiauit.API.Domain.Services;
using Lenggiauit.API.Domain.Services.Communication.Request;
using Lenggiauit.API.Domain.Services.Communication.Request.Admin;
using Lenggiauit.API.Resources;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BlogPostFilterRequest = Lenggiauit.API.Domain.Services.Communication.Request.Admin.BlogPostFilterRequest;

namespace Lenggiauit.API.Services
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IEmailService _emailService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly AppSettings _appSettings;
        private readonly ILogger<AdminService> _logger;

        public AdminService(IAdminRepository adminRepository, IEmailService emailService, ILogger<AdminService> logger, IUnitOfWork unitOfWork, IOptions<AppSettings> appSettings)
        {
            _adminRepository = adminRepository;
            _emailService = emailService;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _appSettings = appSettings.Value;
        }

        public async Task<ResultCode> ArchiveContact(Guid id)
        {
            return await _adminRepository.ArchiveContact(id);
        }

        public async Task<ResultCode> CheckBlogPostTitle(string title, Guid? blogPostId)
        {
            return await _adminRepository.CheckBlogPostTitle(title, blogPostId);
        }

        public async Task<ResultCode> CheckCategoryName(string name, Guid? categoryid)
        {
            return await _adminRepository.CheckCategoryName(name, categoryid);
        }

        public async Task<(BlogPost, ResultCode)> CreateEditBlogPost(BaseRequest<CreateEditBlogPostRequest> request, Guid userId)
        {
            return await _adminRepository.CreateEditBlogPost(request, userId);
        }

        public async Task<(Category, ResultCode)> CreateEditCategory(BaseRequest<CreateEditCategoryRequest> request, Guid userId)
        {
            return await _adminRepository.CreateEditCategory(request, userId);
        }

        public async Task<(Project, ResultCode)> CreateEditProject(BaseRequest<CreateEditProjectRequest> request, Guid userId)
        {
            return await _adminRepository.CreateEditProject(request, userId);
        }

        public async Task<(ProjectType, ResultCode)> CreateEditProjectType(BaseRequest<CreateEditProjectTypeRequest> request, Guid userId)
        {
            return await _adminRepository.CreateEditProjectType(request, userId);
        }

        public async Task<(List<BlogPost>, ResultCode)> GetBlogPost(BaseRequest<BlogPostFilterRequest> request)
        {
            return await _adminRepository.GetBlogPost(request);
        }

        public async Task<(List<Category>, ResultCode)> GetCategory(BaseRequest<CategoryFilterRequest> request)
        {
            return await _adminRepository.GetCategory(request);
        }

        public async Task<(List<Contact>, ResultCode)> GetContactList(BaseRequest<GetContactListRequest> request)
        {
            return await _adminRepository.GetContactList(request);
        }

        public async Task<(List<Project>, ResultCode)> GetProjectList(BaseRequest<GetProjectListRequest> request, Guid userId)
        {
            return await _adminRepository.GetProjectList(request, userId);
        }

        public async Task<(List<ProjectType>, ResultCode)> GetProjectTypeList(BaseRequest<GetProjectTypeListRequest> request)
        {
            return await _adminRepository.GetProjectTypeList(request);
        }

        public async Task<(List<User>, ResultCode)> GetUserList()
        {
            return await _adminRepository.GetUserList();
        }
         
        public async Task<ResultCode> UpdateBlogPostStatus(BaseRequest<UpdateBlogPostStatusRequest> request, Guid userId)
        {
            return await _adminRepository.UpdateBlogPostStatus(request, userId);
        }

        public async Task<ResultCode> UpdateSiteSettings(BaseRequest<UpdateSiteSettingRequest> request, Guid userId)
        {
            return await _adminRepository.UpdateSiteSettings(request, userId);
        }
    }
}
