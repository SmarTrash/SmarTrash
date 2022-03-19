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
        [HttpGet]
        [Route("api/HomePage/gift")]
        public dynamic gift()
        {
            SmarTrashDBContext db = new SmarTrashDBContext();
            dynamic listTop3 = GetTop3();
            dynamic popularGift="";
            List<dynamic> gifts=new List<dynamic>();
            foreach (var item in listTop3)
            {
               int z= item.giftcode;

                popularGift = db.tblGift.Where(x => x.GiftId == z).Select(y => new
                {
                    GiftName = y.GiftName,
                    GiftDescription=y.GiftDescription,
                    Brand=y.Brand,
                    Price=y.Price

                }).ToList();
                gifts.Add(popularGift);
            }

            return gifts;
        }

        public dynamic GetTop3()
        {
            SmarTrashDBContext db = new SmarTrashDBContext();
            dynamic p = db.tblOrder.GroupBy(x => x.GiftCode).Select(y => new
            {
                giftcode = y.Key,
                count = y.Count()
            }).OrderByDescending(y => y.count).Take(3);

            return p;
        }


        [HttpGet]
        [Route("api/HomePage/Comp")]
        //מקבל מייל ומחזיר את המקום שלו בתחרות
        public dynamic Comp([FromBody] tblUser u)
        {
            SmarTrashDBContext db = new SmarTrashDBContext();
            //מחזיר רשימה של האימיילים ולכל אחד את הזריקות של החודש והשנה הנוכחי
            //צריך לסכום לכל אחד את הנקודות ולקבל את המספר של המקום של האימייל הספציפי
           
            var competitionPlaces = db.tblCurrentThrow.Where(y => y.DateThrow.Year == DateTime.Now.Year && y.DateThrow.Month == DateTime.Now.Month).GroupBy(i => i.UserEmail).ToList();
            var sums = new Dictionary<string, object>();

            foreach (var e in competitionPlaces)
            {
                sums.Add(e.Key, e.Sum(x => x.ThrowPoints));
            }
         /////לא עובד האורדר ביי דיסנדינג !!!!
            var userPlace = sums.OrderByDescending(x=>x.Value).Where(z => z.Key == u.UserEmail).Select(r=>r.Key.IndexOf(r.Key));

            return userPlace;

        }



        // GET: api/HomePage/5
        [Route("api/HomePage")]
        //מקבל מייל ומחזיר את הפרטים שלו שצריך לדף הבית
        public dynamic Get([FromBody] tblUser u)
        {
            SmarTrashDBContext db = new SmarTrashDBContext();
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
