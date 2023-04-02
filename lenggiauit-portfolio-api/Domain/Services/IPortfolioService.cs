using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Domain.Helpers;
using Lenggiauit.API.Domain.Services.Communication.Request;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Lenggiauit.API.Domain.Services
{
    public interface IPortfolioService
    {
        Task<(List<Project>, ResultCode)> GetProjectList(BaseRequest<GetPortfolioRequest> request);
        Task<(List<ProjectType>, ResultCode)> GetProjectTypeList();
        Task<(Project, ResultCode)> GetProjectDetail(BaseRequest<string> request);
    }
}
