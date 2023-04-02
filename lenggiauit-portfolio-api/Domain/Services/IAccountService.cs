﻿using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Domain.Helpers;
using Lenggiauit.API.Domain.Services.Communication.Request; 
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Lenggiauit.API.Domain.Services
{
    public interface IAccountService
    {
        Task<User> GetById(Guid id);
        Task<User> Login(string name, string password);
        Task<User> LoginWithGoogle(string email);
        Task<ResultCode> Register(string name, string email, string password); 
        Task<ResultCode> Register(string name, string email, string password, string fullname, string avatar);
        Task<ResultCode> CheckEmail(string email);
        Task<ResultCode> CheckUserName(string userName);
        Task<ResultCode> ForgotPassword(string email);
        Task<ResultCode> ResetPassword(string userInfo, string newPassword);
        Task<ResultCode> UpdateProfile(Guid userId, BaseRequest<UpdateProfileRequest> request);
        Task<ResultCode> UpdateUserAvatar(Guid userId,BaseRequest<UpdateUserAvatarRequest> request);
        Task<ResultCode> CheckEmailWithUser(string email, Guid id);
        Task<ResultCode> SendContact(BaseRequest<SendContactRequest> request);
    }
}
