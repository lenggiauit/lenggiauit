using System;

namespace Lenggiauit.API.Domain.Entities
{
    public class Tag : BaseEntity
    {
        public Guid BlogPostId { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public bool IsPublic { get; set; }
    }
}
