using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Domain.Models;
using Lenggiauit.API.Domain.Repositories;
using Lenggiauit.API.Domain.Services.Communication.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lenggiauit.API.Domain.Helpers;

namespace Lenggiauit.API.Persistence.Repositories
{
    public class RefRepository : BaseRepository, IRefRepository
    {
        private readonly ILogger<RefRepository> _logger;
        public RefRepository(LenggiauitContext context, ILogger<RefRepository> logger) : base(context)
        {
            _logger = logger;
        } 
        public async Task<(SiteSetting, ResultCode)> GetSiteSettings()
        {
            try
            {
                var siteSetting =  await _context.SiteSetting.FirstOrDefaultAsync();
                if (siteSetting != null)
                    return (siteSetting, ResultCode.Success);
                else
                    return (new SiteSetting() { IsOpenToWork = false, IsMultiLanguage = false }, ResultCode.Success); 
            }
            catch (Exception ex)
            {
                _logger.LogError("Error at AddComment method: " + ex.Message);
                return (null, ResultCode.Error);

            }
        }
    }
}
