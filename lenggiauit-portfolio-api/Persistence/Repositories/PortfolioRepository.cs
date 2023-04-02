using LinqKit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Domain.Helpers;
using Lenggiauit.API.Domain.Repositories;
using Lenggiauit.API.Domain.Services.Communication.Request;
using Lenggiauit.API.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lenggiauit.API.Persistence.Repositories
{
    public class PortfolioRepository : BaseRepository, IPortfolioRepository
    {
        private readonly ILogger<PortfolioRepository> _logger;
        public PortfolioRepository(LenggiauitContext context, ILogger<PortfolioRepository> logger) : base(context)
        {
            _logger = logger;
        }

        public async Task<(Project, ResultCode)> GetProjectDetail(BaseRequest<string> request)
        {
            try
            {
                var query = _context.Project.Include(p => p.ProjectType).AsQueryable();  
                return (await query
                  .Where(p => p.Url.Equals(request.Payload))
                  .AsNoTracking()
                  .Select(p => new Project()
                  {
                      Id = p.Id,
                      Name = p.Name,
                      Image = p.Image,
                      Link = p.Link,
                      Description = p.Description,
                      Url = p.Url,
                      ProjectType = p.ProjectType,
                      Technologies = p.Technologies, 
                      CreatedDate = p.CreatedDate
                  }) 
                  .FirstOrDefaultAsync(), ResultCode.Success);

            }
            catch (Exception ex)
            {
                _logger.LogError("Error at GetProjectList method: " + ex.Message);
                return (null, ResultCode.Error);
            }
        }

        public async Task<(List<Project>, ResultCode)> GetProjectList(BaseRequest<GetPortfolioRequest> request)
        { 
            try
            {
                var query = _context.Project.Include(p => p.ProjectType).AsQueryable();

                if (request.Payload.ProjectTypeId != null)
                {
                    query = query
                    .Where(p => p.ProjectType.Id.Equals(request.Payload.ProjectTypeId));
                }
                var totalRow = await query.CountAsync();

                return (await query
                  .AsNoTracking()
                  .Select(p => new Project()
                  {
                      Id = p.Id,
                      Name = p.Name,
                      Image = p.Image,
                      Link = p.Link,
                      Description = p.Description, 
                      Url = p.Url, 
                      ProjectType = p.ProjectType,
                      Technologies = p.Technologies,
                      TotalRows = totalRow,
                      CreatedDate = p.CreatedDate
                  })
                  .OrderByDescending(p => p.CreatedDate)
                  .GetPagingQueryable(request.MetaData)
                  .ToListAsync(), ResultCode.Success);

            }
            catch (Exception ex)
            {
                _logger.LogError("Error at GetProjectList method: " + ex.Message);
                return (null, ResultCode.Error);
            }
        }

        public async Task<(List<ProjectType>, ResultCode)> GetProjectTypeList()
        {
            try
            { 
                return (await _context.ProjectType
                  .Where(pt => pt.IsActive)
                  .AsNoTracking()
                  .Select(p => new ProjectType()
                  {
                      Id = p.Id,
                      Name = p.Name,
                      CreatedDate = p.CreatedDate
                  })
                  .OrderByDescending(p => p.CreatedDate)
                  .ToListAsync(), ResultCode.Success);

            }
            catch (Exception ex)
            {
                _logger.LogError("Error at GetProjectTypeList method: " + ex.Message);
                return (null, ResultCode.Error);
            }
        }
    }
}
