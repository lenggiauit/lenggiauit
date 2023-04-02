using Google.Cloud.Firestore;
using Google.Cloud.Functions.Framework; 
using System; 

namespace CommonLib.Entities
{ 
    [FirestoreData]
    public class User
    {
        [FirestoreProperty]
        public string Name { get; set; }

        [FirestoreProperty]
        public string Fullname { get; set; }

        [FirestoreProperty]
        public string Email { get; set; }

        [FirestoreProperty("Active")]
        public bool IsActive { get; set; }

      
    }
} 
 