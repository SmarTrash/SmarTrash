using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SmarTrash.Controllers
{
    public class SignInController : ApiController
    {
        // GET: api/SignIn
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/SignIn/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/SignIn
        public void Post([FromBody]string value)
        {
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
