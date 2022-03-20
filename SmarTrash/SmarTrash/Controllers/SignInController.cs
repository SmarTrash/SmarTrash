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
        public bool Post([FromBody] tblUser u)
        {
            SmarTrashDBContext db = new SmarTrashDBContext();
            tblUser user = db.tblUser.Where(x => x.UserEmail == u.UserEmail && x.Password == u.Password).FirstOrDefault();
            if (user == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

       
    }
}
