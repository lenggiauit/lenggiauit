using System.ComponentModel.DataAnnotations;

namespace Lenggiauit.API.Domain.Services.Communication.Request
{
    public class SendContactRequest
    {
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress()]
        public string Email { get; set; }
        [Required]
        public string Subject { get; set; }
        [Required]
        public string Message { get; set; } 
    }
}
