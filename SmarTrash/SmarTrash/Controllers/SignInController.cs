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
        //// GET: api/SignIn
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/SignIn/5


        //public bool Get(string u)
        //{



        //}

        // POST: api/SignIn
        [Route("api/SignIn")]
        public bool Post([FromBody] tblUser u)
        {
            SmarTrashDBContext db = new SmarTrashDBContext();
            tblUser user = db.tblUser.Where(x => x.UserEmail == u.UserEmail && x.Password == u.Password).First();
            if (user == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        // PUT: api/SignIn/5
        public void Put(int id, [FromBody]string value)
        {

        }

        // DELETE: api/SignIn/5
        public void Delete(int id)
        {
        }
    }
}
