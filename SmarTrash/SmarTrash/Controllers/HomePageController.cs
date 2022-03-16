using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Data;


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
        [Route("api/HomePage")]
        public dynamic Get([FromBody] tblUser u)
        {
            SmarTrashDBContext db = new SmarTrashDBContext();

            dynamic userDetails = db.tblUser.Where(x => x.UserEmail == u.UserEmail).Select(y => new
            {
                First = y.FirstName,
                Last = y.LastName,
                Img = y.UserImg
            }).ToList();

            return userDetails;

        }

        //// POST: api/HomePage
        //public void Post([FromBody]string value)
        //{
        //}

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
