using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonLib.Resources
{
    public class UserResource
    { 
        public string Id { get; set; } 
        public string Name { get; set; } 
        public string Fullname { get; set; } 
        public string Email { get; set; } 
        public bool IsActive { get; set; }
        public RoleResource Role { get; set; }
        public string AccessToken { get; set; }


    }
}
