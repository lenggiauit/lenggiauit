using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Domain.Helpers;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Lenggiauit.API.Domain.Repositories
{
    public interface INotificationRepository
    {
        Task<(int, ResultCode)> GetNotificationCount(Guid userId);
        Task<(List<Notification>, ResultCode)> GetNotification(Guid userId);
        Task<ResultCode> Remove(Guid Id, Guid userId);
        Task<ResultCode> RemoveAll(Guid userId);
        Task<ResultCode> SendNotification(string message, Guid toUserId);
        
    }
}
