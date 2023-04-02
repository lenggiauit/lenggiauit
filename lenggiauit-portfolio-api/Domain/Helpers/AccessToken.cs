﻿using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Resources;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Lenggiauit.API.Domain.Helpers
{
    public class AccessToken
    {
		public string GenerateToken(User user, string secretKey)
		{
			UserToken userdata = new UserToken();
			userdata.Id = user.Id;
			userdata.Permissions = user.Permissions.Select( p => new PermissionToken() { Code = p.Code }).ToList();
			userdata.Email = user.Email;
			 
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes(secretKey);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new Claim[]
				{
					 new Claim(ClaimTypes.Name, userdata.Id.ToString()),
					 new Claim(ClaimTypes.UserData, JsonConvert.SerializeObject(userdata)),
				}),
				Expires = DateTime.UtcNow.AddYears(10),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
			};
			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
		}


		public class UserToken
        {
			public Guid Id { get; set; } 
			public string Email { get; set; }   
			public List<PermissionToken> Permissions { get; set; }

		}
		public class PermissionToken
		{
			public string Code { get; set; }

		}


	}
}
