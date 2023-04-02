using AutoMapper;
using CommonLib.Entities;
using CommonLib.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonLib.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserResource>(); 
            CreateMap<Role, RoleResource>();
            CreateMap<SiteSetting, SiteSettingResource>();
            
        }
    }
}
