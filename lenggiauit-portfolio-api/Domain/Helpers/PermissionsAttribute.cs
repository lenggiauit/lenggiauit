﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Domain.Services.Communication.Response;
using Lenggiauit.API.Resources;
using System; 
using System.Linq;
using System.Security.Claims;
using static Lenggiauit.API.Domain.Helpers.AccessToken;

namespace Lenggiauit.API.Domain.Helpers
{
    [AttributeUsage(AttributeTargets.Method)]
    public class PermissionsAttribute : Attribute, IAuthorizationFilter 
    {
        public readonly string[] _permissions;
        public PermissionsAttribute(params string[] permissions)
        {
            _permissions = permissions;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var claimUser = context.HttpContext.User.Claims.Where(c => c.Type == ClaimTypes.UserData).FirstOrDefault();
            if (claimUser == null)
            {
                context.Result = new JsonResult( new BaseResponse<ResultCode>("UnAuthorized",  ResultCode.UnAuthorized)); 
            }
            else
            {
                try
                {
                    UserToken userResource = JsonConvert.DeserializeObject<UserToken>(claimUser.Value);
                    if (!userResource.Permissions.Select(p => p.Code).AsEnumerable().Intersect(_permissions.AsEnumerable()).Any())
                    {
                        context.Result = new JsonResult(new BaseResponse<ResultCode>("Do not permission", ResultCode.DoNotPermission));
                    }
                }
                catch
                {
                    context.Result = new JsonResult(new BaseResponse<ResultCode>("Unknown error", ResultCode.Unknown));
                }
            }
        }
    }
}
