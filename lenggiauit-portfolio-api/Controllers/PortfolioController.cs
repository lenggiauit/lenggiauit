using AutoMapper;
using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Domain.Helpers;
using Lenggiauit.API.Domain.Services;
using Lenggiauit.API.Domain.Services.Communication.Request;
using Lenggiauit.API.Domain.Services.Communication.Response;
using Lenggiauit.API.Infrastructure;
using Lenggiauit.API.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Lenggiauit.API.Controllers
{
    [AllowAnonymous]
    [Route("[controller]")]
    [ApiController]
    public class PortfolioController : BaseController
    {
        private readonly IPortfolioService _portfolioServices;
        private readonly ILogger<PortfolioController> _logger;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;
        public PortfolioController(
            IPortfolioService portfolioServices,
            ILogger<PortfolioController> logger,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _portfolioServices = portfolioServices;
            _logger = logger;
            _mapper = mapper;
            _appSettings = appSettings.Value;

        }

        /// <summary>
        /// Get Project List
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("GetProjectList")]
        public async Task<BaseResponse<List<ProjectResource>>> GetProjectList(BaseRequest<GetPortfolioRequest> request)
        {
            if (ModelState.IsValid)
            {
                var (data, resultCode) = await _portfolioServices.GetProjectList(request);
                return new BaseResponse<List<ProjectResource>>(_mapper.Map<List<Project>, List<ProjectResource>>(data));
            }
            else
            {
                return new BaseResponse<List<ProjectResource>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        /// <summary>
        /// Get Project Type List
        /// </summary>
        /// <returns></returns>
        [HttpPost("GetProjectTypeList")]
        public async Task<BaseResponse<List<ProjectTypeResource>>> GetProjectTypeList()
        {
            if (ModelState.IsValid)
            {
                var (data, resultCode) = await _portfolioServices.GetProjectTypeList();
                return new BaseResponse<List<ProjectTypeResource>>(_mapper.Map<List<ProjectType>, List<ProjectTypeResource>>(data));
            }
            else
            {
                return new BaseResponse<List<ProjectTypeResource>>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        [HttpPost("GetProjectDetail")]
        public async Task<BaseResponse<ProjectResource>> GetProjectDetail(BaseRequest<string> request)
        {
            if (!string.IsNullOrEmpty(request.Payload))
            {
                var (data, resultCode) = await _portfolioServices.GetProjectDetail(request);
                return new BaseResponse<ProjectResource>(_mapper.Map<Project, ProjectResource>(data));
            }
            else
            {
                return new BaseResponse<ProjectResource>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }


        
    }
}
