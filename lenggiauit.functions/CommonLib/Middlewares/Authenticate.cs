using CommonLib.Communication;
using CommonLib.Services.Implemments;
using Google.Cloud.Functions.Framework;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Net;
using System.Threading.Tasks;

namespace CommonLib.Middlewares
{
    public class Authenticate
    {
        private readonly RequestDelegate _next;

        public Authenticate(RequestDelegate next) =>
            _next = next;

        public async Task InvokeAsync(HttpContext context, ILogger<HttpCors> logger)
        {
            if (!context.User.Identity.IsAuthenticated)
            { 
                new BaseResponse(context).Invalid();
                return;
            }
            else
            {
                await _next(context);
            }
        }
    }
}
