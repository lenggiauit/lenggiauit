using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonLib.Communication
{
    public class BaseResponse
    {
        private HttpContext _httpContext;
        public BaseResponse(HttpContext httpContext){
            _httpContext = httpContext;
        }
        public async Task OK(string message = "")
        {
            _httpContext.Response.StatusCode = 200;
            Json <object> json = new Json<object>()
            {
                ResultCode = ResultCode.Success,
                Message = string.IsNullOrEmpty(message) ? "Ok" : message
            };

            await _httpContext.Response.WriteAsJsonAsync(json, typeof(Json<object>));
        } 

        public async Task OK<T>(T result, string message = "")
        {
            _httpContext.Response.StatusCode = 200;
            Json<object> json = new Json<object>()
            {
                ResultCode = ResultCode.Success,
                Message = message,
                Resource = result
            };

            await _httpContext.Response.WriteAsJsonAsync(json, typeof(Json<object>));
        }

        public async Task Invalid(string message = "")
        {
            _httpContext.Response.StatusCode = 500;
            Json<object> json = new Json<object>()
            {
                ResultCode = ResultCode.Invalid,
                Message = string.IsNullOrEmpty(message) ? "Invalid" : message
            };

            await _httpContext.Response.WriteAsJsonAsync(json, typeof(Json<object>));
        }
        public async Task Error(string message = "")
        {
            _httpContext.Response.StatusCode = 500;
            Json<object> json = new Json<object>()
            {
                ResultCode = ResultCode.Error,
                Message = string.IsNullOrEmpty(message) ? "Error" : message
            };

            await _httpContext.Response.WriteAsJsonAsync(json, typeof(Json<object>));
        }


    }
}
