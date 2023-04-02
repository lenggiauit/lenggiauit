﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Domain.Helpers;
using Lenggiauit.API.Domain.Repositories;
using Lenggiauit.API.Domain.Services.Communication.Request; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lenggiauit.API.Persistence.Repositories
{
    public class AccountRepository : BaseRepository, IAccountRepository
    {
        private readonly ILogger<AccountRepository> _logger;
        public AccountRepository(LenggiauitContext context, ILogger<AccountRepository> logger) : base(context)
        {
            _logger = logger;
        }
         
        public async Task<ResultCode> CheckEmail(string email)
        {
            try
            {
                var existUserEmail = await _context.User.AsNoTracking()
                    .Where(u => u.Email.Equals(email))
                    .Select(u => new User()
                    {
                        Id = u.Id
                    })
                    .FirstOrDefaultAsync();
                if (existUserEmail != null)
                {
                    return ResultCode.Invalid;
                }
                else
                {
                    return ResultCode.Valid;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return ResultCode.Error;
            }
        }

        public async Task<ResultCode> CheckEmailWithUser(string email, Guid id)
        {
            try
            {
                var existUserEmail = await _context.User.AsNoTracking()
                    .Where(u => u.Email.Equals(email) && !u.Id.Equals(id))
                    .Select(u => new User()
                    {
                        Id = u.Id
                    }).FirstOrDefaultAsync();
                if (existUserEmail != null)
                {
                    return ResultCode.Invalid;
                }
                else
                {
                    return ResultCode.Valid;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return ResultCode.Error;
            }
        }

        public async Task<ResultCode> CheckUserName(string userName)
        {
            try
            {
                var existUser = await _context.User.AsNoTracking()
                    .Where(u => u.UserName.Equals(userName))
                    .Select(u => new User()
                    {
                        Id = u.Id
                    })
                    .FirstOrDefaultAsync();
                if (existUser != null)
                {
                    return ResultCode.Invalid;
                }
                else
                {
                    return ResultCode.Valid;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return ResultCode.Error;
            }
        }
         
        public async Task<User> GetByEmail(string email)
        {
            try
            {
                return await _context.User.AsNoTracking()
                    .Where(u => u.Email.Equals(email))
                    .Select(u => new User()
                    {
                        Id = u.Id,
                        Address = u.Address,
                        Avatar = u.Avatar,
                        CreatedBy = u.CreatedBy,
                        CreatedDate = u.CreatedDate,
                        Email = u.Email,
                        FullName = u.FullName,
                        IsActive = u.IsActive, 
                        Password = u.Password,
                        Phone = u.Phone,
                        RoleId = u.RoleId,
                        UserName = u.UserName
                    })
                    .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<User> GetById(Guid id)
        {
            try
            {
                return await _context.User.AsNoTracking()
                    .Where(u => u.Id.Equals(id))
                    .Select(u => new User()
                    {
                        Id = u.Id,
                        Address = u.Address,
                        Avatar = u.Avatar,
                        CreatedBy = u.CreatedBy,
                        CreatedDate = u.CreatedDate,
                        Email = u.Email,
                        FullName = u.FullName,
                        IsActive = u.IsActive, 
                        Password = u.Password,
                        Phone = u.Phone,
                        RoleId = u.RoleId,
                        UserName = u.UserName
                    })
                    .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }
         
        public async Task<User> Login(string name, string password)
        {
            try
            { 

                return await _context.User.AsNoTracking()
                .Where(a => (a.UserName.Equals(name) || a.Email.Equals(name)) && a.Password.Equals(password))
                
                .Select(a => new User()
                {
                    Id = a.Id,
                    UserName = a.UserName,
                    Email = a.Email,
                    Avatar = a.Avatar,
                    RoleId = a.RoleId,
                    FullName = a.FullName,
                    Phone = a.Phone,
                    Address = a.Address, 
                    Role = _context.Role.Where(r => r.Id == a.RoleId).FirstOrDefault(),
                    Permissions = _context.PermissionInRole.Where(pir => pir.RoleId == a.RoleId)
                                .Join(_context.Permission.Select(per => new Permission
                                {
                                    Id = per.Id,
                                    Code = per.Code.Trim(),
                                    Name = per.Name,
                                    Description = per.Description,
                                    IsActive = per.IsActive
                                }),
                                perInRole => perInRole.PermissionId,
                                per => per.Id,
                                (perInRole, per) => per).ToList()
                }).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }

        }

        public async Task<User> LoginWithGoogle(string email)
        {
            try
            {
                return await _context.User.AsNoTracking()
                    .Where(a => a.Email.Equals(email))
                .Select(acc => new User()
                {
                    Id = acc.Id,
                    UserName = acc.UserName,
                    Email = acc.Email,
                    Avatar = acc.Avatar,
                    FullName = acc.FullName,
                    Phone = acc.Phone,
                    Address = acc.Address, 
                    RoleId = acc.RoleId,
                    Role = _context.Role.Where(r => r.Id == acc.RoleId).FirstOrDefault(),
                    Permissions = _context.PermissionInRole.Where(pir => pir.RoleId == acc.RoleId)
                                .Join(_context.Permission.Select(per => new Permission
                                {
                                    Id = per.Id,
                                    Code = per.Code.Trim(),
                                    Name = per.Name,
                                    Description = per.Description,
                                    IsActive = per.IsActive
                                }),
                                    perInRole => perInRole.PermissionId,
                                    per => per.Id,
                                    (perInRole, per) => per).ToList()
                }).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<ResultCode> Register(string name, string email, string password)
        {
            try
            {
                var existUser = await _context.User
                    .Where(u => u.UserName.Equals(name) || u.Email.Equals(email))
                    .Select(u => new User()
                    {
                        Id = u.Id,
                        Email = u.Email,
                    })
                    .FirstOrDefaultAsync();
                if (existUser != null)
                {
                    if (existUser.Email.Equals(email))
                        return ResultCode.RegisterExistEmail;
                    else
                        return ResultCode.RegisterExistUserName;
                }
                else
                {
                    User newUser = new User()
                    {
                        Id = Guid.NewGuid(),
                        UserName = name,
                        Email = email,
                        IsActive = true,
                        Password = password,
                        CreatedDate = DateTime.Now,
                        CreatedBy = Guid.Empty,
                        RoleId = _context.Role.Where(r => r.Name.Equals(Constants.DefaultRole)).FirstOrDefaultAsync().Result.Id
                    };
                    await _context.User.AddAsync(newUser);
                    await _context.SaveChangesAsync();
                    return ResultCode.Success;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return ResultCode.Error;
            }

        }

        public async Task<ResultCode> Register(string name, string email, string password, string fullname, string avatar)
        {
            try
            {
                var existUser = await _context.User
                    .Where(u => u.UserName.Equals(name) || u.Email.Equals(email))
                    .Select(u => new User()
                    {
                        Id = u.Id,
                        Email = u.Email,
                    })
                    .FirstOrDefaultAsync();
                if (existUser != null)
                {
                    if (existUser.Email.Equals(email))
                        return ResultCode.RegisterExistEmail;
                    else
                        return ResultCode.RegisterExistUserName;
                }
                else
                {
                    User newUser = new User()
                    {
                        Id = Guid.NewGuid(),
                        FullName = fullname,
                        Avatar = avatar,
                        UserName = name,
                        Email = email,
                        IsActive = true,
                        Password = password,
                        CreatedDate = DateTime.Now,
                        CreatedBy = Guid.Empty,
                        RoleId = _context.Role.Where(r => r.Name.Equals(Constants.DefaultRole)).FirstOrDefaultAsync().Result.Id
                    };
                    await _context.User.AddAsync(newUser);
                    await _context.SaveChangesAsync();
                    return ResultCode.Success;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return ResultCode.Error;
            }
        }

        public async Task<ResultCode> SendContact(BaseRequest<SendContactRequest> request)
        { 
            try
            {
                var newContact = new Contact()
                {
                    Id = Guid.NewGuid(),
                    Name = request.Payload.Name,
                    Email = request.Payload.Email,
                    Subject = request.Payload.Subject,
                    IsArchived = false,
                    Message = request.Payload.Message,
                    CreatedDate = DateTime.Now
                };
                await _context.Contact.AddAsync(newContact);
                await _context.SaveChangesAsync();
                return ResultCode.Success;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return ResultCode.Error;
            }
        }

        public async Task<bool> UpdateProfile(Guid userId, UpdateProfileRequest payload)
        {
            try
            {
                var user = await _context.User.Where(u => u.Id.Equals(userId)).FirstOrDefaultAsync();
                if (user != null)
                {
                    user.FullName = payload.FullName;
                    user.Email = payload.Email;
                    user.Address = payload.Address; 
                    user.Phone = payload.Phone;
                    _context.Update(user);
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }

        public async Task<bool> UpdateUserAvatar(Guid id, string avartarUrl)
        {
            try
            {
                var user = await _context.User.Where(u => u.Id.Equals(id)).FirstOrDefaultAsync();
                if (user != null)
                {
                    user.Avatar = avartarUrl;
                    _context.Update(user);
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }

        public async Task UpdateUserPasword(Guid id, string newPassword)
        {
            try
            {
                var user = await _context.User.Where(u => u.Id.Equals(id)).FirstOrDefaultAsync();
                if (user != null)
                {
                    user.Password = newPassword;
                    _context.Update(user);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }
    }
}
