using CommonLib;
using CommonLib.Communication;
using CommonLib.Entities;
using CommonLib.Function;
using CommonLib.Middlewares;
using CommonLib.Models;
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
     

    public Function(ILogger<Function> logger, ConfigurationService configurationService)
    {
        _logger = logger;
        _configurationService = configurationService;
    }

    public async Task HandleAsync(HttpContext context)
    {
        try
        { 
            var contactForm = await context.Request.GetRequest<BaseRequest<ContactForm>>();  
            _logger.LogInformation("Starting request");
            if (contactForm != null && contactForm.IsValid())
            {
                _logger.LogInformation("Request Form valid");
                FirestoreDb db = FirestoreDb.Create(Constants.ProjectId);
                _logger.LogInformation("FirestoreDb");
                CollectionReference contactCollection = db.Collection("SendContact");
                SendContact sendContact = new SendContact()
                {
                    Email = contactForm.Payload.Email,
                    Name = contactForm.Payload.Name,
                    Subject = contactForm.Payload.Subject,
                    Message = contactForm.Payload.Message
                }; 
                await contactCollection.AddAsync(sendContact); 
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
