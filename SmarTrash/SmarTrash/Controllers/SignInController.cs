using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Data;
using System.Net.Mail;


namespace SmarTrash.Controllers
{
    public class SignInController : ApiController
    {


        [HttpPost]
        [Route("api/SendMail")]
        public IHttpActionResult SendMail([FromBody] tblUser u)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                tblUser user = db.tblUser.Where(x => x.UserEmail == u.UserEmail).FirstOrDefault();
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                mail.From = new MailAddress("rupb912022@gmail.com");
                mail.To.Add(u.UserEmail);
                mail.Subject = "שיחזור סיסמא";
                mail.Body = "שלום" + " " + user.FirstName + " " + user.LastName + Environment.NewLine +
                "הסיסמא שלך היא:  " + user.Password + Environment.NewLine + Environment.NewLine + Environment.NewLine + Environment.NewLine +
                "ברוך שובך ! ההטבות הכי שוות עדיין מחכות לך.. כדאי לך למחזר במהרה כדי להשיג אותן";
                SmtpServer.UseDefaultCredentials = false;
                SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                SmtpServer.Port = 587;
                SmtpServer.UseDefaultCredentials = false;
                SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                SmtpServer.Credentials = new System.Net.NetworkCredential("rupb912022@gmail.com", "ylpt mkon ppny icky");
                SmtpServer.EnableSsl = true;
                SmtpServer.Send(mail);
                return Ok(new { status = 201, isSuccess = true, message = "'הסיסמה נשלחה אליך למייל" });
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }

        }

    }
}