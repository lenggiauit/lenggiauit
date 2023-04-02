using CommonLib.Services.Interfaces;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonLib.Services.Implemments
{
    public class HttpClientFactoryService : IHttpClientFactoryService
    {
        private readonly IHttpClientFactory _clientFactory; 
        private readonly ILogger<HttpClientFactoryService> _logger;
        public HttpClientFactoryService(IHttpClientFactory clientFactory
            , ILogger<HttpClientFactoryService> logger
            
            )
        {
            _clientFactory = clientFactory; 
            _logger = logger;
        }

        public async Task<JObject> GetAsync(string url)
        {
            var client = _clientFactory.CreateClient();
            client.Timeout = TimeSpan.FromMinutes(15);
            var request = new HttpRequestMessage(HttpMethod.Get, url);
            using var response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);

            if (response.IsSuccessStatusCode)
            {
                try
                {
                    using (Stream stream = await response.Content.ReadAsStreamAsync())
                    using (StreamReader streamReader = new StreamReader(stream))
                    using (JsonReader reader = new JsonTextReader(streamReader))
                    {
                        reader.SupportMultipleContent = true;
                        return new JsonSerializer().Deserialize<JObject>(reader);
                    }
                }
                catch (NotSupportedException)
                {
                    _logger.LogError("The content type is not supported.");
                }
                catch (JsonException ex)
                {
                    _logger.LogError("Invalid JSON. Ex: " + ex.Message);
                }
                return null;
            }
            else
            {
                return null;
            }
        }
    }
}
