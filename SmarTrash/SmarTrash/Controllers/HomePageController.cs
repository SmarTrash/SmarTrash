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
        public dynamic Get(string email)
        {
            SmarTrashDBContext db = new SmarTrashDBContext();
        
            dynamic tblUser = db.tblUser.Select(x => new
            {
                FirstName = x.FirstName,
                LastName = x.LastName,
                UserImg = x.UserImg
            }).ToList();

            return tblUser;

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
