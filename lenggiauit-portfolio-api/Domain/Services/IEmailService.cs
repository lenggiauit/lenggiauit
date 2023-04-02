﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lenggiauit.API.Domain.Services
{
    public interface IEmailService
    {
        Task Send(string from, string to, string subject, string content, string smtpPwd);
        Task Send(string to, string subject, string content, string smtpPwd);
    }
}
