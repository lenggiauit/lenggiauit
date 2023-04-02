using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonLib
{
    public class ConfigurationOptions
    {
        public const string ConfigurationAppSettingsSection = "AppSettings"; 
        public AppSettings AppSettings { get; }
        public string[] AllowedHosts { get; }

    }
}
