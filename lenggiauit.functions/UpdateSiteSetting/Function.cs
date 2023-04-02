using CommonLib;
using CommonLib.Communication;
using CommonLib.Entities;
using CommonLib.Function;
using CommonLib.Middlewares;
using CommonLib.Models;
using CommonLib.Services.Implemments;
using CommonLib.Services.Interfaces;
using Google.Cloud.Firestore;
using Google.Cloud.Functions.Framework;
using Google.Cloud.Functions.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace UpdateSiteSettingV1Function;

/// <summary>
/// FunctionsStartup
/// </summary>
public class Startup : FunctionsStartup
{
    public override void Configure(WebHostBuilderContext context, IApplicationBuilder app)
    { 
        app.ConfigureStartupWithUseAuthorization();
    }
    public override void ConfigureServices(WebHostBuilderContext context, IServiceCollection services)
    {
        services.ConfigureStartupServicesWithUseAuthorization(context);
    }
}

[FunctionsStartup(typeof(Startup))] 
public class Function : IHttpFunction
{
    private readonly ILogger _logger;
    private readonly ConfigurationService _configurationService;
    private readonly IAccountService _accountService;

    public Function(ILogger<Function> logger, ConfigurationService configurationService,
        IAccountService accountService)
    {
        _logger = logger;
        _configurationService = configurationService;
        _accountService = accountService;
    }

    public async Task HandleAsync(HttpContext context)
    {
        try
        { 
            var siteSettingForm = await context.Request.GetRequest<BaseRequest<SiteSettingForm>>();
            if (siteSettingForm != null && siteSettingForm.IsValid())
            {
                FirestoreDb db = FirestoreDb.Create(Constants.ProjectId); 
                _logger.LogInformation("FirestoreDb");
                CollectionReference siteSettingCollection = db.Collection("SiteSetting");
                QuerySnapshot querySnapshot = await siteSettingCollection.GetSnapshotAsync();
                if (querySnapshot.Count > 0)
                {
                    DocumentReference documentReference = querySnapshot.Documents.First().Reference;
                    Dictionary<string, object> updates = new Dictionary<string, object>();
                    if(siteSettingForm.Payload.IsMultiLanguage != null)
                    {
                        updates.Add("MultiLanguage", siteSettingForm.Payload.IsMultiLanguage);
                    }
                    if (siteSettingForm.Payload.IsOpenToWork != null)
                    {
                        updates.Add("OpenToWork", siteSettingForm.Payload.IsOpenToWork);
                    } 
                    await documentReference.UpdateAsync(updates);
                }
                else
                {
                    SiteSetting siteSetting = new SiteSetting()
                    {
                        IsMultiLanguage = siteSettingForm.Payload.IsMultiLanguage?? false,
                        IsOpenToWork = siteSettingForm.Payload.IsOpenToWork ?? false,
                    };
                    await siteSettingCollection.AddAsync(siteSetting);
                }
                await new BaseResponse(context).OK(); 
            }
            else
            {
                await new BaseResponse(context).Invalid();
            } 

        }
        catch (JsonException ex)
        {
            _logger.LogError(ex.Message);
            await new BaseResponse(context).Error(ex.Message);
        }
    }
}
