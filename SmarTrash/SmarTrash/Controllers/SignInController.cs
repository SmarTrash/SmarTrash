using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Data;
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
       
    }
}
