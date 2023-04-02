using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonLib
{
    public class AppSettings
    { 
        public string MailSender { get; set; } 
        public string[] AllowedHosts { get; set; }
        public string GoogleapisUrl { get; set; }
        public string Secret { get; set; }
    }
}
