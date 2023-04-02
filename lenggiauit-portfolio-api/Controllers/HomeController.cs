using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Domain.Helpers;
using Lenggiauit.API.Domain.Services;
using Lenggiauit.API.Domain.Services.Communication.Response;
using Lenggiauit.API.Infrastructure;
using Lenggiauit.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lenggiauit.API.Domain.Services.Communication.Request;

namespace Lenggiauit.API.Controllers
{
    [AllowAnonymous]
    [Route("[controller]")]
    [ApiController]
    public class HomeController : BaseController
    {
        private readonly IHomeService _homeServices;
        private readonly ILogger<HomeController> _logger;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;
        public HomeController(
            IHomeService homeServices,
            ILogger<HomeController> logger,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _homeServices = homeServices;
            _logger = logger;
            _mapper = mapper;
            _appSettings = appSettings.Value;

        }
        /// <summary>
        /// Get Site settings
        /// </summary>
        /// <returns></returns>
        [HttpPost("getSiteSettings")]
        public async Task<BaseResponse<SiteSettingResource>> GetSiteSettings()
        {
            if (ModelState.IsValid)
            {
                var (data, resultCode) = await _homeServices.GetSiteSettings();
                if (data != null)
                {
                    return new BaseResponse<SiteSettingResource>(_mapper.Map<SiteSetting, SiteSettingResource>(data));
                }
                else
                {
                    return new BaseResponse<SiteSettingResource>(Constants.ErrorMsg, resultCode);
                }
            }
            else
            {
                return new BaseResponse<SiteSettingResource>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        } 

    }
}