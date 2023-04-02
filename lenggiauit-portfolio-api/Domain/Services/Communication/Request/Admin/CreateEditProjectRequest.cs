using System;
using System.ComponentModel.DataAnnotations;

namespace Lenggiauit.API.Domain.Services.Communication.Request.Admin
{
    public class CreateEditProjectRequest
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Image { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Technologies { get; set; }
        [Required]
        public Guid ProjectTypeId { get; set; }  
        public string Link { get; set; }
        public bool IsPublic { get; set; }
    }
}
