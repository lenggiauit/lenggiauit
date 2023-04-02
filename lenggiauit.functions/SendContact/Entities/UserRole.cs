using Google.Cloud.Firestore;
using Google.Cloud.Functions.Framework;
using System;

namespace CommonLib.Entities
{
    [FirestoreData]
    public class UserRole
    {
        [FirestoreProperty]
        public string UserId { get; set; }

        [FirestoreProperty]
        public string RoleId { get; set; }
    }
}
