using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Domain.Helpers;
using Lenggiauit.API.Domain.Models;
using Lenggiauit.API.Domain.Services.Communication.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lenggiauit.API.Domain.Repositories
{
    public interface IRefRepository
    {
        Task<(SiteSetting, ResultCode)> GetSiteSettings();
    }
}
