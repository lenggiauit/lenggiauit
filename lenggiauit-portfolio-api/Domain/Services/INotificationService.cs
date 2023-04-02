using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Domain.Helpers;
using Lenggiauit.API.Domain.Services.Communication.Request;
using Lenggiauit.API.Domain.Services.Communication.Request.Admin;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Lenggiauit.API.Domain.Services
{
    public interface INotificationService
    {
        Task<(int, ResultCode)> GetNotificationCount(Guid userId);
        Task<(List<Notification>, ResultCode)> GetNotification(Guid userId);
        Task<ResultCode> Remove(Guid Id, Guid userId);
        Task<ResultCode> RemoveAll(Guid userId);
    }
}
