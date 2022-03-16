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
        //מקבל מייל ומחזיר את הפרטים שלו שצריך לדף הבית
        public dynamic Get([FromBody] tblUser u)
        {
            SmarTrashDBContext db = new SmarTrashDBContext();
            //מחזיר רשימה של האימיילים ולכל אחד את הזריקות של החודש והשנה הנוכחי
            //צריך לסכום לכל אחד את הנקודות ולקבל את המספר של המקום של האימייל הספציפי
            var competitionPlaces = db.tblCurrentThrow.Where(y => y.DateThrow.Year == DateTime.Now.Year && y.DateThrow.Month == DateTime.Now.Month).GroupBy(i => i.UserEmail).ToList();
            int lastPoints = db.tblCurrentThrow.Where(y => y.UserEmail == u.UserEmail).OrderByDescending(x => x.DateThrow).FirstOrDefault().ThrowPoints;
            dynamic userDetails = db.tblUser.Where(x => x.UserEmail == u.UserEmail).Select(y => new
            {
                First = y.FirstName,
                Last = y.LastName,
                Img = y.UserImg,
                Points = y.TotalPoints,
                lastThrow= lastPoints,
                //competitionPlace
            }).ToList();
            return userDetails;
        }
       

        // POST: api/HomePage
        public void Post([FromBody] string value)
        {
        }

        //PUT: api/HomePage/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/HomePage/5
        public void Delete(int id)
        {
        }
    }
}
