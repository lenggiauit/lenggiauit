using AutoMapper;
using CommonLib;
using CommonLib.Communication;
using CommonLib.Entities;
using CommonLib.Function;
using CommonLib.Middlewares;
using CommonLib.Models;
using CommonLib.Resources;
using CommonLib.Services.Implemments;
using Google.Cloud.Firestore;
using Google.Cloud.Functions.Framework;
using Google.Cloud.Functions.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks; 
using JsonException = Newtonsoft.Json.JsonException; 

namespace SendContactV1Function;

/// <summary>
/// FunctionsStartup
/// </summary>
public class Startup : FunctionsStartup
{
    public override void Configure(WebHostBuilderContext context, IApplicationBuilder app)
    {
        app.ConfigureStartup(); 
    }
    public override void ConfigureServices(WebHostBuilderContext context, IServiceCollection services)
    {
        services.ConfigureStartupServices(context);
    }
}

[FunctionsStartup(typeof(Startup))]
public class Function : IHttpFunction
{
    private readonly ILogger _logger;
    private readonly ConfigurationService _configurationService;
    private IMapper _mapper;

    public Function(ILogger<Function> logger, ConfigurationService configurationService, IMapper mapper)
    {
        _logger = logger;
        _configurationService = configurationService;
        _mapper = mapper;   
    }

    public async Task HandleAsync(HttpContext context)
    {
        try
        {
            FirestoreDb db = FirestoreDb.Create(Constants.ProjectId);
            DocumentSnapshot siteSettingDocSnapshot = db.Collection("SiteSetting").GetSnapshotAsync().Result.FirstOrDefault();

            if (siteSettingDocSnapshot.Exists)
            {
                SiteSettingResource settings = _mapper.Map<SiteSetting, SiteSettingResource>(siteSettingDocSnapshot.ConvertTo<SiteSetting>()); 
                await new BaseResponse(context).OK(settings, string.Empty);
            }
            else
            {
                await new BaseResponse(context).OK(new SiteSettingResource() { IsMultiLanguage = false, IsOpenToWork = false }, string.Empty);
            }
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex.Message);
            await new BaseResponse(context).Error(ex.Message); 
        }
    }
}
