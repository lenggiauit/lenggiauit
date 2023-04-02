
using System.ComponentModel.DataAnnotations.Schema;

namespace Lenggiauit.API.Domain.Entities
{
    public class Contact : BaseEntity
    {
        public string Name { get; set; } 
        public string Email { get; set; } 
        public string Subject { get; set; } 
        public string Message { get; set; }
        public bool IsArchived { get; set; }

        [NotMapped]
        public int TotalRows { get; set; }
    }
}
 