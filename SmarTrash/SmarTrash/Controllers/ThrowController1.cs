using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SmarTrash.Controllers
{
    public class ThrowController1 : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody] string value)
        {
        }

        // POST api/Throw/ThrowGarbage
        [HttpPost]
        [Route("api/Throw/ThrowGarbage")]
        // זריקת פסולת, מוסיף לטבלת זריקות, 
        public IHttpActionResult ThrowGarbage([FromBody] tblUser u)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                //tblGift gift = db.tblGift.Where(y => y.GiftId == g).FirstOrDefault();
                //gift.Stock -= 1;
                //tblUser user = db.tblUser.Where(x => x.UserEmail == u.UserEmail).FirstOrDefault();
                //user.TotalPoints -= gift.Price;
                db.SaveChanges();
                return Content(HttpStatusCode.OK, "ההזמנה התבצעה בהצלחה");
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }

        // PUT api/<controller>/5
        public void Put(int id)
        {
        }
    }
}