using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Domain.Helpers;
using Lenggiauit.API.Domain.Services;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Lenggiauit.API.Domain.Repositories;
using Lenggiauit.API.Domain.Services.Communication.Request;

namespace Lenggiauit.API.Services
{
    public class HomeService : IHomeService
    {
        private readonly IRefRepository _refRepository;
        private readonly ILogger<HomeService> _logger;
        private readonly IDistributedCache _distributedCache;
        private readonly IHttpClientFactory _clientFactory;
        private readonly AppSettings _appSettings; 

        public HomeService(IRefRepository refRepository, IDistributedCache distributedCache, IHttpClientFactory clientFactory, ILogger<HomeService> logger, IOptions<AppSettings> appSettings)
        {
            _refRepository = refRepository;
            _logger = logger; 
            _appSettings = appSettings.Value;
            _distributedCache = distributedCache;
            _clientFactory = clientFactory;
        }

        public async Task<(SiteSetting, ResultCode)> GetSiteSettings()
        {
            return await _refRepository.GetSiteSettings();
        } 
    }
}
