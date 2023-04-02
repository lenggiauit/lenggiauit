using AutoMapper;
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
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks; 
using Microsoft.Extensions.DependencyInjection;
using CommonLib.Resources;

namespace AuthenticationV1Function;

/// <summary>
/// FunctionsStartup
/// </summary>
public class Startup : FunctionsStartup
{
    public override void Configure(WebHostBuilderContext context, IApplicationBuilder app) {

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
    private readonly IHttpClientFactoryService _httpClientFactoryService;
    private readonly IAccountService _accountService;
    private IMapper _mapper;
    public Function(ILogger<Function> logger, ConfigurationService configurationService, 
        IHttpClientFactoryService httpClientFactoryService, IAccountService accountService, IMapper mapper)
    {
        _logger = logger;
        _configurationService = configurationService;
        _httpClientFactoryService = httpClientFactoryService;
        _accountService = accountService;
        _mapper = mapper;
    }

    public async Task HandleAsync(HttpContext context)
    {
        try
        {
            var loginForm = await context.Request.GetRequest<BaseRequest<LoginForm>>();
            if (loginForm != null && loginForm.IsValid())
            {
               var googleapisUrl =  _configurationService.AppSettings.GoogleapisUrl;
                var googleApiResponse = _httpClientFactoryService.GetAsync(string.Format(googleapisUrl, loginForm.Payload.AccessToken)).Result;
                if (googleApiResponse != null)
                {
                    var userdb = await _accountService.GetUserByEmail(googleApiResponse["email"].ToString());
                    if (userdb != null)
                    {
                        AccessToken accessTokenGenerate = new AccessToken();
                        Role roledb = await _accountService.GetUserRole(userdb.Id);
                        
                        var accessToken = accessTokenGenerate.GenerateToken(userdb, roledb, _configurationService.AppSettings.Secret);

                        UserResource user = _mapper.Map<User, UserResource> (userdb);
                        RoleResource role = _mapper.Map<Role, RoleResource>(roledb);
                        user.Role = role;
                        user.AccessToken = accessToken; 
                        await new BaseResponse(context).OK(user, "login successfully");
                    }
                    else
                    {
                        await new BaseResponse(context).Invalid("login failed");
                    }
                }
                else
                { 
                    await new BaseResponse(context).Invalid();
                }
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
