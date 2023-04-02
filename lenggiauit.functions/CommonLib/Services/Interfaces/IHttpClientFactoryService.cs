using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonLib.Services.Interfaces
{
    public interface IHttpClientFactoryService
    {
        Task<JObject> GetAsync(string url);
    }
}
