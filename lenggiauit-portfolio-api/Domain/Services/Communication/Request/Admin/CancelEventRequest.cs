using System;
using System.ComponentModel.DataAnnotations;

namespace Lenggiauit.API.Domain.Services.Communication.Request.Admin
{
    public class CancelEventRequest
    {
        [Required]
        public Guid Id { get; set; }
    }
}
