using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Data;
using System.Net.Mail;
using System.Net;

namespace SmarTrash.Controllers
{
    public class SignInController : ApiController
    {

        // POST: api/SignIn
        /// מקבל משתמש ובודק שקיים משתמש עם מייל וסיסמא כאלה . מחזיר אמת או שקר. 
        [Route("api/SignIn")]
        [HttpPost]
        public IHttpActionResult Post([FromBody] tblUser u)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                var log = db.tblUser.Where(x => x.UserEmail == u.UserEmail && x.Password == u.Password).FirstOrDefault();
                if (log == null)
                {
                    return Ok(new { status = 404, isSuccess = false, message = "משתמש לא קיים במערכת", });
                }
                return Ok(new { status = 200, isSuccess = true, message = "ההתחברות בוצעה בהצלחה" }); 
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
           
        }
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
                SmtpServer.Credentials = new System.Net.NetworkCredential("rupb912022@gmail.com", "rupb912022@smatrash");
                SmtpServer.EnableSsl = true;
                SmtpServer.Send(mail);
                return Ok();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
            
        }

    }
}
