using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonLib.Services.Implemments
{
    public class ConfigurationService
    {
        public AppSettings AppSettings { get; }

        public ConfigurationService(AppSettings setting) =>
            AppSettings = setting;
    }
}
