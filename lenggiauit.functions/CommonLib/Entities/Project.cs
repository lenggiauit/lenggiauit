using Google.Cloud.Firestore;
using Google.Cloud.Functions.Framework;
using System;

namespace CommonLib.Entities
{
    [FirestoreData]
    public class Project
    {
        [FirestoreDocumentId]
        public string Id { get; set; }
        [FirestoreProperty]
        public string Name { get; set; }

        [FirestoreProperty]
        public string Image { get; set; }
        [FirestoreProperty]
        public string Description { get; set; }
        [FirestoreProperty]
        public string Technologies { get; set; }

        [FirestoreProperty]
        public string Url { get; set; }

        [FirestoreProperty]
        public string Link { get; set; }

        [FirestoreProperty("Publish")]
        public bool IsPublish { get; set; } 
    }
}
 