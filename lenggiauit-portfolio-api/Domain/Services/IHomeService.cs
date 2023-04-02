using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Domain.Helpers;
using Lenggiauit.API.Domain.Services.Communication.Request;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Lenggiauit.API.Domain.Services
{
    public interface IHomeService
    {
        Task<(SiteSetting, ResultCode)> GetSiteSettings(); 
    }
}
