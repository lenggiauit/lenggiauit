﻿using System;
using System.ComponentModel.DataAnnotations;

namespace Lenggiauit.API.Domain.Services.Communication.Request
{
    public class RemoveEventRequest
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        [MaxLength(250)]
        public string Reason { get; set; }
        
    }
}
