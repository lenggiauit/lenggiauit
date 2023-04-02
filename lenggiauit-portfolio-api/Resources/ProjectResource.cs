using System;

namespace Lenggiauit.API.Resources
{
    public class ProjectResource
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public string Technologies { get; set; }  
        public virtual ProjectTypeResource ProjectType { get; set; }
        public string Url { get; set; }
        public string Link { get; set; } 
        public int TotalRows { get; set; }
    }
}
