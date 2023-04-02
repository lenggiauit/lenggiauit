using Google.Cloud.Firestore;
using Google.Cloud.Functions.Framework;
using System;

namespace CommonLib.Entities
{ 
    [FirestoreData]
    public class Role
    {
        [FirestoreProperty]
        public string Name { get; set; } 

        [FirestoreProperty("Active")]
        public bool IsActive { get; set; }


    }
}
