using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonLib.Communication
{
   
    public static class BaseRequest
    { 
        public static async Task<T> GetRequest<T>(this HttpRequest httpRequest)
        {
            try
            {
                var bodyStream = new StreamReader(httpRequest.Body); 
                var bodyText = await bodyStream.ReadToEndAsync(); 
                return (T)JsonConvert.DeserializeObject<T>(bodyText); 
            }
            catch
            {
                return default(T);
            }
            
        } 
    }
}
