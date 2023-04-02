using CommonLib.Entities;
using CommonLib.Services.Interfaces;
using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonLib.Services.Implemments
{
    public class AccountService : IAccountService
    {
        public async Task<User> GetUserByEmail(string email)
        {
            FirestoreDb db = FirestoreDb.Create(Constants.ProjectId);
            CollectionReference userCollection = db.Collection("User");
            QuerySnapshot userQuerySnapshot = await userCollection.WhereEqualTo("Email", email).GetSnapshotAsync();
            if(userQuerySnapshot.Count > 0)
            { 
                return userQuerySnapshot.Documents.First().ConvertTo<User>(); ;
            }
            else
            {
                return null;
            }
        }

        public async Task<User> GetUserById(string userId)
        {
            FirestoreDb db = FirestoreDb.Create(Constants.ProjectId);
            DocumentSnapshot userDocSnapshot = await db.Collection("User").Document(userId).GetSnapshotAsync();
            
            if (userDocSnapshot.Exists)
            {
                return userDocSnapshot.ConvertTo<User>();
            }
            else
            {
                return null;
            }
        }

        public async Task<Role> GetUserRole(string userId)
        {
            FirestoreDb db = FirestoreDb.Create(Constants.ProjectId);
            CollectionReference roleCollection = db.Collection("Role");
            QuerySnapshot roleQuerySnapshot = await roleCollection.GetSnapshotAsync();
            if (roleQuerySnapshot.Count > 0)
            {
                CollectionReference userRoleCollection = db.Collection("UserRole");
                QuerySnapshot userRoleQuerySnapshot = await userRoleCollection.WhereEqualTo("UserId", userId).GetSnapshotAsync();
                if(userRoleQuerySnapshot.Count > 0)
                {
                    return roleQuerySnapshot.Documents.FirstOrDefault(r => r.Id.Equals(userRoleQuerySnapshot.First().ConvertTo<UserRole>().RoleId))?.ConvertTo<Role>(); 
                }
                else
                {
                    return null;
                }  
            }
            else
            {
                return null;
            }
        }
    }
}
