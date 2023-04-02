﻿using Lenggiauit.API.Domain.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lenggiauit.API.Domain.Services.Communication.Response
{
    public class BaseResponse<T>
    { 
        public ResultCode ResultCode { get; private set; }
        public string Messages { get; private set; }
        public T Resource { get; private set; }

        public BaseResponse(T resource)
        { 
            Messages = string.Empty;
            Resource = resource;
            ResultCode = ResultCode.Success;
        }
        public BaseResponse((T resource, ResultCode resultCode) param)
        {
            Messages = string.Empty;
            Resource = param.resource;
            ResultCode = param.resultCode;
        }
        public BaseResponse(T resource, ResultCode resultCode)
        {
            Messages = string.Empty;
            Resource = resource;
            ResultCode = resultCode;
        }
        public BaseResponse(string message, ResultCode resultCode = ResultCode.Unknown)
        { 
            Messages = message;
            Resource = default;
            ResultCode = resultCode;
        }
        public BaseResponse(bool success)
        { 
            Messages = string.Empty;
            Resource = default;
            ResultCode = success ? ResultCode.Success : ResultCode.Error;
        }
        public BaseResponse(ResultCode resultCode)
        {
            Messages = string.Empty;
            Resource = default;
            ResultCode = resultCode;
        }
    }
}
