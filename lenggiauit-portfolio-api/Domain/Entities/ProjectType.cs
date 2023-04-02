

using System.ComponentModel.DataAnnotations.Schema;

namespace Lenggiauit.API.Domain.Entities
{ 
    public class ProjectType : BaseEntity
    { 
        public string Name { get; set; } 
        public bool IsActive { get; set; }
        [NotMapped]
        public int TotalRows { get; set; }
    }
}
