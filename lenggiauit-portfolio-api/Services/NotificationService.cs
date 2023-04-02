﻿using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Domain.Helpers;
using Lenggiauit.API.Domain.Services; 
using Lenggiauit.API.Domain.Repositories; 
using Lenggiauit.API.Domain.Services.Communication.Request;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Lenggiauit.API.Services
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _notificationRepository;
        private readonly IEmailService _emailService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly AppSettings _appSettings;
        private readonly ILogger<NotificationService> _logger;

        public NotificationService(INotificationRepository notificationRepository, IEmailService emailService, ILogger<NotificationService> logger, IUnitOfWork unitOfWork, IOptions<AppSettings> appSettings)
        {
            _notificationRepository = notificationRepository;
            _emailService = emailService;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _appSettings = appSettings.Value;
        }

        public async Task<(List<Notification>, ResultCode)> GetNotification(Guid userId)
        {
            return await _notificationRepository.GetNotification(userId);
        }

        public async Task<(int, ResultCode)> GetNotificationCount(Guid userId)
        {
            return await _notificationRepository.GetNotificationCount(userId);
        }

        public async Task<ResultCode> Remove(Guid id, Guid userId)
        {
            return await _notificationRepository.Remove(id, userId);
        }

        public async Task<ResultCode> RemoveAll(Guid userId)
        {
            return await _notificationRepository.RemoveAll(userId);
        }
    }
}
