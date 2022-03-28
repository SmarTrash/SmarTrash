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
        //מקבל מייל וסיסמא ובודק שהמשתמש קיים במערכת והפרטים תקינים. מחזיר אמת/ שקר
        [Route("api/SignIn")]
        [HttpPost]
        public IHttpActionResult Post([FromBody] tblUser u)
        {
            SmarTrashDBContext db = new SmarTrashDBContext();
            var log = db.tblUser.Where(x => x.UserEmail == u.UserEmail && x.Password == u.Password).FirstOrDefault();
            if (log == null)
            {
                return Ok(new { status = 401, isSuccess = false, message = "Invalid User", });
            }
            else
            {
                return Ok(new { status = 200, isSuccess = true, message = "User Login successfully", UserDetails = log });
            }
        }

       
    }
}
