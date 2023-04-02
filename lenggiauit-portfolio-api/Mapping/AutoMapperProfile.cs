using AutoMapper;
using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Domain.Models;
using Lenggiauit.API.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lenggiauit.API.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<SiteSetting, SiteSettingResource>();
            CreateMap<User, UserResource>();
            CreateMap<User, UserListResource>(); 
            CreateMap<Role, RoleResource>();
            CreateMap<Permission, PermissionResource>();
            
            // Ref
            CreateMap<RefModel, RefResource>(); 
            CreateMap<Conversation,ConversationResource>();
            CreateMap<User, ConversationerResource>();
            CreateMap<ConversationMessage, ConversationMessageResource>(); 
            
            CreateMap<Language, LanguageResource>();
            //
            CreateMap<Category, CategoryResource>();
            CreateMap<Tag, TagResource>();
            CreateMap<BlogPost, BlogPostResource>();
            CreateMap<Comment, CommentResource>(); 
            CreateMap<Notification, NotificationResource>(); 
            //
            CreateMap<FileSharing, FileSharingResource > ();
            CreateMap<Project, ProjectResource>();
            CreateMap<ProjectType, ProjectTypeResource>(); 
        }
    }
}