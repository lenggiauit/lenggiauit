using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Lenggiauit.API.Domain.Helpers;
using Lenggiauit.API.Domain.Models;
using Lenggiauit.API.Domain.Services;
using Lenggiauit.API.Domain.Services.Communication.Request;
using Lenggiauit.API.Domain.Services.Communication.Response;
using Lenggiauit.API.Infrastructure;
using Lenggiauit.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lenggiauit.API.Controllers
{
    [Authorize]
    [Route("Ref")]
    public class RefController : BaseController
    {
        private readonly IRefService _refServices;
        private readonly ILogger<RefController> _logger;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;
        public RefController(
            ILogger<RefController> logger,
            IMapper mapper,
            IRefService refServices,
            IOptions<AppSettings> appSettings)
        {
            _refServices = refServices;
            _logger = logger;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        /// <summary>
        /// Encrypt text
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("Encrypt")]
        public Task<string> Encrypt(string text)
        { 
            string en = EncryptionHelper.Encrypt(text, Constants.PassDecryptKey); 
            return Task.FromResult(en);
        }

        /// <summary>
        /// Decrypt text
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("Decrypt")]
        public Task<string> Decrypt(string text)
        { 
            string de = EncryptionHelper.Decrypt(text, Constants.PassDecryptKey);
            return Task.FromResult(de);
        }


    }
}
