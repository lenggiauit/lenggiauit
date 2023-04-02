

using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lenggiauit.API.Domain.Entities
{ 
    public class Project : BaseEntity
    { 
        public string Name { get; set; } 
        public string Image { get; set; } 
        public string Description { get; set; } 
        public string Technologies { get; set; }

        [ForeignKey("Project")]
        public Guid ProjectTypeId { get; set; }
        public virtual ProjectType ProjectType { get; set; }
        public string Url { get; set; } 
        public string Link { get; set; } 
        public bool IsPublic { get; set; }
        [NotMapped]
        public int TotalRows { get; set; }
    }
} 
 