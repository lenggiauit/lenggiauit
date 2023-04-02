﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Lenggiauit.API.Domain.Services.Communication.Request
{
    public class UpdateProfileRequest
    { 
        [Required]
        public string Email { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Phone { get; set; } 
        [Required]
        public string Address { get; set; }
    }
}
