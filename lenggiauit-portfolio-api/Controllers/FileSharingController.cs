using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Lenggiauit.API.Domain.Helpers;
using Lenggiauit.API.Domain.Services;
using Lenggiauit.API.Domain.Services.Communication.Response;
using Lenggiauit.API.Infrastructure;
using Lenggiauit.API.Resources;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Linq;
using Lenggiauit.API.Domain.Services.Communication.Request;
using Lenggiauit.API.Domain.Services.Communication.Request.Admin;
using System.Collections.Generic;
using AutoMapper;
using Lenggiauit.API.Domain.Entities;

namespace Lenggiauit.API.Controllers
{
    [AllowAnonymous]
    [Route("[controller]")]
    [ApiController]
    public class FileSharingController : BaseController
    {
        private readonly IFileService _fileService;
        private readonly ILogger<FileController> _logger;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;

        public FileSharingController(IFileService fileService, IMapper mapper, ILogger<FileController> logger, IOptions<AppSettings> appSettings)
        {
            _fileService = fileService;
            _logger = logger;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        /// <summary>
        /// GetFileSharing
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("GetFileSharing")]
        public async Task<BaseResponse<List<FileSharingResource>>> GetFileSharing(BaseRequest<FileSharingSearchRequest> request)
        {
            if (ModelState.IsValid)
            {
                var (data, resultCode) = await _fileService.GetFileSharing(request);
                return new BaseResponse<List<FileSharingResource>>(_mapper.Map<List<FileSharing>, List<FileSharingResource>>(data)); 
            }
            else
            {
                return new BaseResponse<List<FileSharingResource>>(Constants.InvalidMsg, ResultCode.Invalid);
            }

        }
    }
}
