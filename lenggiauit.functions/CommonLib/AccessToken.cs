using CommonLib.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Newtonsoft.Json;

namespace CommonLib
{
    public class AccessToken
    {
		public string GenerateToken(User user, Role role, string secretKey)
		{
			UserToken userdata = new UserToken();
			userdata.Id = user.Id;
			if(role != null)
				userdata.Role = new RoleToken { Id = role.Id, Name = role.Name };
			else
				userdata.Role = new RoleToken { Id = String.Empty, Name = Constants.DefaultUserRole };

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
			public string Id { get; set; }
			public string Email { get; set; }
			public RoleToken Role { get; set; } 

		}
		public class RoleToken
		{
			public string Id { get; set; }
			public string Name { get; set; }

		}
	}
}
