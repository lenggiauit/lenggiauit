using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Lenggiauit.API.Domain.Helpers;
using Lenggiauit.API.Domain.Services;
using Lenggiauit.API.Domain.Services.Communication.Request;
using Lenggiauit.API.Domain.Services.Communication.Response;
using System.Threading.Tasks;

namespace Lenggiauit.API.Controllers
{
    [Route("[controller]")]  
    public class ContactController : ControllerBase
    { 
        private readonly IEmailService _emailService;
        private readonly IAccountService _accountServices;
        private readonly ILogger<ContactController> _logger;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;
        public ContactController(ILogger<ContactController> logger, 
            IEmailService emailService,
            IAccountService accountServices,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _logger = logger; 
            _emailService = emailService;
            _accountServices = accountServices;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        /// <summary>
        /// Send contact
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("SendContact")]
        public async Task<BaseResponse<ResultCode>> SendContact([FromBody] BaseRequest<SendContactRequest> request)
        {
            if (ModelState.IsValid)
            {
                return new BaseResponse<ResultCode>(await _accountServices.SendContact(request)); 
            }
            else
            {
                return new BaseResponse<ResultCode>(Constants.InvalidMsg, ResultCode.Invalid); 
            }

        }
    }
}
