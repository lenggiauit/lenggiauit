using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Domain.Helpers;
using Lenggiauit.API.Domain.Repositories;
using Lenggiauit.API.Domain.Services;
using Lenggiauit.API.Domain.Services.Communication.Request;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Lenggiauit.API.Services
{
    public class PortfolioService : IPortfolioService
    {
        private readonly IPortfolioRepository _portfolioRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly AppSettings _appSettings;
        private readonly ILogger<PortfolioService> _logger;

        public PortfolioService(IPortfolioRepository portfolioRepository, ILogger<PortfolioService> logger, IUnitOfWork unitOfWork, IOptions<AppSettings> appSettings)
        {
            _portfolioRepository = portfolioRepository;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _appSettings = appSettings.Value;
        }

        public async Task<(Project, ResultCode)> GetProjectDetail(BaseRequest<string> request)
        { 
            return await _portfolioRepository.GetProjectDetail(request);
        }

        public async Task<(List<Project>, ResultCode)> GetProjectList(BaseRequest<GetPortfolioRequest> request)
        {
            return await _portfolioRepository.GetProjectList(request);
        }

        public async Task<(List<ProjectType>, ResultCode)> GetProjectTypeList()
        {
            return await _portfolioRepository.GetProjectTypeList();
        }
    }
}
