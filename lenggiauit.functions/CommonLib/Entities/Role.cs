using Google.Cloud.Firestore;
using Google.Cloud.Functions.Framework;
using System;

namespace CommonLib.Entities
{ 
    [FirestoreData]
    public class Role
    {
        [FirestoreDocumentId]
        public string Id { get; set; }
        [FirestoreProperty]
        public string Name { get; set; } 

        [FirestoreProperty("Active")]
        public bool IsActive { get; set; }


    }
}
