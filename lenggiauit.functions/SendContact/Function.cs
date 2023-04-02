using CommonLib;
using CommonLib.Communication;
using CommonLib.Entities;
using CommonLib.Models;
using Google.Cloud.Firestore;
using Google.Cloud.Functions.Framework;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

namespace HelloHttp;

public class Function : IHttpFunction
{
  private readonly ILogger _logger;

  public Function(ILogger<Function> logger) =>
    _logger = logger;

    public async Task HandleAsync(HttpContext context)
    {
        try
        {
            var contactForm = await context.Request.GetRequest<ContactForm>();
            if (contactForm != null && contactForm.IsValid())
            {

                FirestoreDb db = FirestoreDb.Create(Constants.ProjectId);
                CollectionReference contactCollection = db.Collection("SendContact");
                SendContact sendContact = new SendContact()
                {
                    Email = contactForm.Email,
                    Name = contactForm.Name,
                    Subject = contactForm.Subject,
                    Message = contactForm.Message
                };
                await contactCollection.AddAsync(sendContact);
                await new BaseResponse(context).OK();
            }
            else
            {
                await new BaseResponse(context).Invalid();
            }

        }
        catch (JsonException ex)
        {
            _logger.LogError(ex.Message);
            await new BaseResponse(context).Error(ex.Message);
        }
    }
}
