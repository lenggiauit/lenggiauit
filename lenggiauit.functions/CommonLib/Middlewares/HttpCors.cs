using CommonLib.Services.Implemments;
using Google.Cloud.Functions.Framework;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Extensions;
using CommonLib.Communication;

namespace CommonLib.Middlewares
{
    public class HttpCors
    {
        private readonly RequestDelegate _next;

        public HttpCors(RequestDelegate next) =>
            _next = next;

        public async Task InvokeAsync(HttpContext context, ILogger<HttpCors> logger)
        {
            ConfigurationService configurationService = (ConfigurationService)context.RequestServices.GetService(typeof(ConfigurationService));
            if (configurationService != null)
            {
                try
                {
                    logger.LogInformation("Request origin: " + context.Request.Headers["origin"]);
                    if (!configurationService.AppSettings.AllowedHosts.Any(s => s.ToLower().Equals(context.Request.Headers["origin"].ToString().ToLower())))
                    {
                        await new BaseResponse(context).Invalid();
                        return;
                    }
                }
                catch
                {
                    await new BaseResponse(context).Error();
                    return;
                }
            } 
            await _next(context); 
        }
    }
}
