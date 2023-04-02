using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Domain.Helpers;
using Lenggiauit.API.Domain.Services;
using Lenggiauit.API.Domain.Services.Communication.Request;
using Lenggiauit.API.Domain.Services.Communication.Response;
using Lenggiauit.API.Infrastructure;
using Lenggiauit.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Lenggiauit.API.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class AccountController : BaseController
    {
        private readonly IAccountService _accountServices; 
        private readonly IHttpClientFactoryService _httpClientFactoryService;
        private readonly ILogger<AccountController> _logger;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;
        public AccountController(
            ILogger<AccountController> logger,
            IMapper mapper,
            IAccountService accountService, 
            IHttpClientFactoryService httpClientFactoryService,
            IOptions<AppSettings> appSettings)
        {
            _accountServices = accountService; 
            _httpClientFactoryService = httpClientFactoryService;
            _logger = logger;
            _mapper = mapper;
            _appSettings = appSettings.Value; 
        }
        /// <summary>
        /// Login with user/pass
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns> 
        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<BaseResponse<UserResource>> Login([FromBody] BaseRequest<AuthenticateRequest> request)
        {
            if (ModelState.IsValid)
            {
                var user = await _accountServices.Login( request.Payload.Name, request.Payload.Password );
                if (user != null)
                {
                    var resources = _mapper.Map<User, UserResource>(user);
                    AccessToken accessToken = new AccessToken(); 
                    resources.AccessToken = accessToken.GenerateToken(user, _appSettings.Secret); 
                    return new BaseResponse<UserResource>(resources);
                }
                else
                {
                    return new BaseResponse<UserResource>(Constants.InvalidMsg, ResultCode.NotExistUser);
                }
            }
            else
            {
                return new BaseResponse<UserResource>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }
        /// <summary>
        /// Login with google
        /// </summary>
        /// <param name="access_token"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("LoginWithGoogle")]
        public async Task<BaseResponse<UserResource>> LoginWithGoogle(string access_token)
        {
            try
            {
                var googleApiResponse = _httpClientFactoryService.GetAsync(string.Format(_appSettings.GoogleapisUrl, access_token)).Result;
                if (googleApiResponse != null)
                {
                    var user = await _accountServices.LoginWithGoogle(googleApiResponse["email"].ToString());
                    if (user != null)
                    {
                        var resources = _mapper.Map<User, UserResource>(user);
                        AccessToken accessToken = new AccessToken(); 
                        resources.AccessToken = accessToken.GenerateToken(user, _appSettings.Secret); 
                        return new BaseResponse<UserResource>(resources);
                    }
                    else
                    {
                        return new BaseResponse<UserResource>(Constants.UnknowMsg, ResultCode.NotExistEmail);
                    }
                }
                else
                {
                    return new BaseResponse<UserResource>(Constants.InvalidMsg, ResultCode.Unknown);
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new BaseResponse<UserResource>(Constants.InvalidMsg, ResultCode.Error);
            }
        }

        /// <summary>
        /// Register with user name and pass
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<BaseResponse<ResultCode>> Register([FromBody] BaseRequest<RegisterRequest> request)
        {
            if (ModelState.IsValid)
            {
                var result = await _accountServices.Register(request.Payload.UserName, request.Payload.Email, request.Payload.Password);
                return new BaseResponse<ResultCode>(string.Empty, result);
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        /// <summary>
        /// Register With Google
        /// </summary>
        /// <param name="access_token"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("RegisterWithGoogle")]
        public async Task<BaseResponse<ResultCode>> RegisterWithGoogle(string access_token)
        {  
            try
            {
               var googleApiResponse = _httpClientFactoryService.GetAsync(string.Format(_appSettings.GoogleapisUrl, access_token)).Result;
               if(googleApiResponse != null)
                {
                    var result = await _accountServices.Register(
                        googleApiResponse["email"].ToString(), 
                        googleApiResponse["email"].ToString(), 
                        string.Empty,
                        googleApiResponse["name"].ToString(),
                        googleApiResponse["picture"].ToString()
                        );
                    return new BaseResponse<ResultCode>(string.Empty, result); 
                }
                else
                {
                    return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Unknown);
                } 
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Error);
            }
        }

        /// <summary>
        /// Check email exist in database or not
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("CheckEmail")]
        public async Task<BaseResponse<ResultCode>> CheckEmail(string email)
        { 
            var result = await _accountServices.CheckEmail(email);
            return new BaseResponse<ResultCode>(string.Empty, result); 
        }

        /// <summary>
        /// Check email with user ID
        /// </summary>
        /// <param name="email"></param>
        /// <param name="Id"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("CheckEmailWithUser")]
        public async Task<BaseResponse<ResultCode>> CheckEmailWithUser(string email, Guid Id)
        {
            var result = await _accountServices.CheckEmailWithUser(email, Id);
            return new BaseResponse<ResultCode>(string.Empty, result);
        }

        /// <summary>
        /// Check User name exist in database or not
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("CheckUserName")]
        public async Task<BaseResponse<ResultCode>> CheckUserName(string name)
        {
            var result = await _accountServices.CheckUserName(name);
            return new BaseResponse<ResultCode>(string.Empty, result);
        }

        /// <summary>
        /// Forgot Password
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("ForgotPassword")]
        public async Task<BaseResponse<ResultCode>> ForgotPassword([FromBody] BaseRequest<ForgotPasswordRequest> request)
        {
            if (ModelState.IsValid)
            {
                var result = await _accountServices.ForgotPassword(request.Payload.Email);
                return new BaseResponse<ResultCode>(string.Empty, result);
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        /// <summary>
        /// ResetPassword
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("ResetPassword")]
        public async Task<BaseResponse<ResultCode>> ResetPassword([FromBody] BaseRequest<ResetPasswordRequest> request)
        {
            if (ModelState.IsValid)
            {
                var result = await _accountServices.ResetPassword(request.Payload.UserInfo, request.Payload.NewPassword);
                return new BaseResponse<ResultCode>(string.Empty, result);
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        /// <summary>
        /// UpdateProfile
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("UpdateProfile")]
        public async Task<BaseResponse<ResultCode>> UpdateProfile([FromBody] BaseRequest<UpdateProfileRequest> request)
        {
            if (ModelState.IsValid)
            {
                var result = await _accountServices.UpdateProfile(GetCurrentUserId(), request);
                return new BaseResponse<ResultCode>(string.Empty, result); 
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        }

        /// <summary>
        /// UpdateUserAvatar
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns> 
        [HttpPost("UpdateUserAvatar")]
        public async Task<BaseResponse<ResultCode>> UpdateUserAvatar([FromBody] BaseRequest<UpdateUserAvatarRequest> request)
        {
            if (ModelState.IsValid)
            {
                var result = await _accountServices.UpdateUserAvatar(GetCurrentUserId(), request);
                return new BaseResponse<ResultCode>(result);
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid);
            }
        } 
        
    }
}
