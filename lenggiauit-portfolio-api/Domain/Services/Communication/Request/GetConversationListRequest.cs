﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lenggiauit.API.Domain.Services.Communication.Request
{
    public class GetConversationListRequest
    {
        public Guid UserId { get; set; }
    }
}