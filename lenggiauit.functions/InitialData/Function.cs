using CommonLib;
using CommonLib.Entities;
using Google.Cloud.Firestore;
using Google.Cloud.Functions.Framework;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;


public class Function : IHttpFunction
{
    private readonly ILogger _logger;

    public Function(ILogger<Function> logger) =>
        _logger = logger;

    public async Task HandleAsync(HttpContext context)
    {
        HttpRequest request = context.Request;
        try
        { 
            FirestoreDb db = FirestoreDb.Create(Constants.ProjectId);
            // check collection User.
            CollectionReference userCollection = db.Collection("User");
            QuerySnapshot userQuerySnapshot = await userCollection.WhereEqualTo("Email", "lenggiauit@gmail.com").GetSnapshotAsync();
            
            if(userQuerySnapshot.Count() == 0)
            {
                User newUser = new User
                {
                    Name = "Giau Le",
                    Email = "lenggiauit@gmail.com",
                    Fullname = "Le Ngoc Giau",
                    IsActive  = true,
                };
                 
                await userCollection.AddAsync(newUser);
            }
            // check collection Role.
            CollectionReference roleCollection = db.Collection("Role");
            QuerySnapshot roleQuerySnapshot = await roleCollection.WhereEqualTo("Name", "Adminitrator").GetSnapshotAsync();
            // Role Adminitrator
            if (roleQuerySnapshot.Count() == 0)
            {
                Role newRole = new Role
                {
                    Name = "Adminitrator", 
                    IsActive = true,
                };

                await roleCollection.AddAsync(newRole);
            }
            // Role Guest
            roleQuerySnapshot = await roleCollection.WhereEqualTo("Name", "Guest").GetSnapshotAsync();
            if (roleQuerySnapshot.Count() == 0)
            {
                Role newRole = new Role
                {
                    Name = "Guest",
                    IsActive = true,
                };

                await roleCollection.AddAsync(newRole);
            }
            //
            CollectionReference userRoleCollection = db.Collection("UserRole");
            

            QuerySnapshot userAdminSnapshot = await userCollection.WhereEqualTo("Email", "lenggiauit@gmail.com").GetSnapshotAsync();
            QuerySnapshot roleAdminSnapshot = await roleCollection.WhereEqualTo("Name", "Adminitrator").GetSnapshotAsync();
            if(userAdminSnapshot.Count > 0 && roleAdminSnapshot.Count > 0)
            {
                QuerySnapshot userRoleSnapshot = await userRoleCollection.WhereEqualTo("UserId", userAdminSnapshot[0].Id).GetSnapshotAsync();
                if(userRoleSnapshot.Count == 0)
                {
                    UserRole newUserRole = new UserRole
                    {
                        UserId = userAdminSnapshot[0].Id,
                        RoleId = roleAdminSnapshot[0].Id,
                    }; 

                    await userRoleCollection.AddAsync(newUserRole);
                } 
            }
             
            // project type
            CollectionReference projectTypeCollection = db.Collection("ProjectType");
            QuerySnapshot projectTypeSnapshot = await userCollection.WhereEqualTo("Name", "Web Development").GetSnapshotAsync();
            if (projectTypeSnapshot.Count() == 0)
            {
                ProjectType newProjectType = new ProjectType
                {
                    Name = "Web Development",
                    IsActive = true,
                };

                await projectTypeCollection.AddAsync(newProjectType);
            }
            // Mobile Development
            projectTypeSnapshot = await userCollection.WhereEqualTo("Name", "Mobile Development").GetSnapshotAsync();
            if (projectTypeSnapshot.Count() == 0)
            {
                ProjectType newProjectType = new ProjectType
                {
                    Name = "Mobile Development",
                    IsActive = true,
                };

                await projectTypeCollection.AddAsync(newProjectType);
            }
            // SiteSetting

            // SiteSetting
            CollectionReference siteSettingCollection = db.Collection("SiteSetting");
            QuerySnapshot documentSnapshots = await siteSettingCollection.GetSnapshotAsync();
            if (documentSnapshots.Count() == 0)
            {
                SiteSetting setting = new SiteSetting
                {
                    IsOpenToWork = true,
                    IsMultiLanguage = true,
                };

                await siteSettingCollection.AddAsync(setting);
            }



            await context.Response.WriteAsync($"InitialData is run completed !");
        }
        catch (Exception ex)
        {
            _logger.LogError($"InitialData {ex.Message} !");
            context.Response.StatusCode = 500; 
            await context.Response.WriteAsync(ex.Message);
        }
        
    }
}

 