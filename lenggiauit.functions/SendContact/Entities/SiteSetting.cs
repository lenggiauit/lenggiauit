using Google.Cloud.Firestore;
using Google.Cloud.Functions.Framework;
using System;

namespace CommonLib.Entities
{
    [FirestoreData]
    public class SiteSetting
    { 
        [FirestoreProperty("OpenToWork")]
        public bool IsOpenToWork { get; set; }
        [FirestoreProperty("MultiLanguage")]
        public bool IsMultiLanguage { get; set; }
    }
}
