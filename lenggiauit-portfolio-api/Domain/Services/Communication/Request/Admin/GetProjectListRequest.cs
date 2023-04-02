using System;

namespace Lenggiauit.API.Domain.Services.Communication.Request.Admin
{
    public class GetProjectListRequest 
    {
        public Guid? ProjectTypeId { get; set; }
        public bool? IsPublish { get; set; }
    }
}
