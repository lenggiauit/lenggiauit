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
    [Authorize]
    [Route("File")]
    [ApiController]
    public class FileController : BaseController
    {
        private readonly IFileService _fileService;
        private readonly ILogger<FileController> _logger;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;

        public FileController(IFileService fileService, IMapper mapper, ILogger<FileController> logger, IOptions<AppSettings> appSettings)
        {
            _fileService = fileService;
            _logger = logger;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        /// <summary>
        /// Upload Image
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        [HttpPost("UploadImage")]
        public async Task<BaseResponse<FileResource>> UploadImage(IFormFile file)
        {
            if (file != null)
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), _appSettings.FileFolderPath);
                string fileName = await _fileService.UploadImage(file, path);
                if (!string.IsNullOrEmpty(fileName))
                {
                    return new BaseResponse<FileResource>(new FileResource
                    {
                        FileName = fileName,
                        Url = string.Format("{0}://{1}{2}/{3}", Request.Scheme, Request.Host.Value, _appSettings.FileRequestUrl, fileName)
                    }); ;
                }
                else
                {
                    return new BaseResponse<FileResource>("Cannot image upload!", ResultCode.Unknown);
                }
            }
            else
            {
                return new BaseResponse<FileResource>("File upload is null!", ResultCode.Unknown);
            }
        }

        /// <summary>
        /// Upload Package File
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        [HttpPost("UploadPackageFile")]
        public async Task<BaseResponse<FileResource>> UploadPackageFile(IFormFile file)
        {
            if (file != null)
            {
                if (_appSettings.TemplateSupportExtension.Any(e => e.ToLower().Equals(file.ContentType.ToLower())))
                {
                    string path = Path.Combine(Directory.GetCurrentDirectory(), _appSettings.FileFolderPath);
                    string fileName = await _fileService.UploadTemplateZipFile(file, path);
                    if (!string.IsNullOrEmpty(fileName))
                    {
                        return new BaseResponse<FileResource>(new FileResource
                        {
                            FileName = fileName,
                            Url = string.Format("{0}://{1}{2}/{3}", Request.Scheme, Request.Host.Value, _appSettings.FileRequestUrl, fileName)
                        }); ;
                    }
                    else
                    {
                        return new BaseResponse<FileResource>("Cannot file upload!", ResultCode.Unknown);
                    }
                }
                else
                {
                    return new BaseResponse<FileResource>("File doesn't not support!", ResultCode.Unknown);
                }
            }
            else
            {
                return new BaseResponse<FileResource>("File upload is null!", ResultCode.Unknown);
            }
        } 

    }
}
