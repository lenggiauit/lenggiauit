using CommonLib.Middlewares;
using CommonLib.Services.Implemments;
using CommonLib.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens; 
using System.Linq;
using System.Text; 

namespace CommonLib.Function
{
    public static class StartupConfigure
    {
        public static IApplicationBuilder ConfigureStartup(this IApplicationBuilder app)
        {
            //app.UseMiddleware<HttpCors>();
            app.UseCors("AllowAllOrigins");
            return app;
        }
        public static IApplicationBuilder ConfigureStartupWithUseAuthorization(this IApplicationBuilder app)
        {
            app.UseAuthorization();
            app.UseAuthentication(); 
            app.UseCors("AllowAllOrigins");
            // app.UseMiddleware<HttpCors>();
            app.UseMiddleware<Authenticate>();
            return app;
        }

        public static IServiceCollection ConfigureStartupServices(this IServiceCollection services, WebHostBuilderContext context)
        {
            ConfigurationOptions options = new ConfigurationOptions();
            // AppSetting
            var appSettingsSection = context.Configuration.GetSection(ConfigurationOptions.ConfigurationAppSettingsSection);
            var appSettings = appSettingsSection.Get<AppSettings>();
            ConfigurationService configurationService = new ConfigurationService(appSettings);
            services.AddSingleton(configurationService);
            services.AddScoped<IHttpClientFactoryService, HttpClientFactoryService>();
            services.AddHttpClient();
            services.AddScoped<IAccountService, AccountService>();
            // AllowAllOrigins CORS
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });
            services.AddAutoMapper(typeof(StartupConfigure));
            return services;
        }
        public static IServiceCollection ConfigureStartupServicesWithUseAuthorization(this IServiceCollection services, WebHostBuilderContext context)
        {
            ConfigurationOptions options = new ConfigurationOptions();
            // AppSetting
            var appSettingsSection = context.Configuration.GetSection(ConfigurationOptions.ConfigurationAppSettingsSection);
            var appSettings = appSettingsSection.Get<AppSettings>();
            ConfigurationService configurationService = new ConfigurationService(appSettings);
            services.AddSingleton(configurationService);
            services.AddScoped<IAccountService, AccountService>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthorization();
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
               .AddJwtBearer(x =>
               {
                   x.Events = new JwtBearerEvents
                   {
                       OnTokenValidated = context =>
                       {
                           var accService = context.HttpContext.RequestServices.GetRequiredService<IAccountService>();

                           var user = accService.GetUserById(context.Principal.Identity.Name).Result;
                           if (user == null)
                           {
                               context.Fail("Unauthorized");
                           }
                           return Task.CompletedTask;
                       }
                   };
                   x.RequireHttpsMetadata = false;
                   x.SaveToken = true;
                   x.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateIssuerSigningKey = true,
                       IssuerSigningKey = new SymmetricSecurityKey(key),
                       ValidateIssuer = false,
                       ValidateAudience = false
                   };
               });
            // AllowAllOrigins CORS
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });

            return services;
        }

    }
}
