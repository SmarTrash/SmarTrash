using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SmarTrash.Controllers
{
    public class HomePageController : ApiController
    {
        // GET: api/HomePage
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/HomePage/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/HomePage
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/HomePage/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/HomePage/5
        public void Delete(int id)
        {
        }
    }
}
