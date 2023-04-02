using System;
using System.ComponentModel.DataAnnotations;

namespace Lenggiauit.API.Domain.Services.Communication.Request
{
    public class CommmentRequest
    {
        [Required]
        public Guid PostId { get; set; }
    }
}
