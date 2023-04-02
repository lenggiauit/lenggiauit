using CommonLib.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonLib.Services.Interfaces
{
    public interface IAccountService
    {
        Task<User> GetUserByEmail(string email);
        Task<Role> GetUserRole(string userId);
        Task<User> GetUserById(string userId);  
    }
}
