using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Data;
namespace SmarTrash.Controllers
{
    public class Throw
    {
        public string email;
        public string fullName;
        public int throws;
    }
    public class CompetitionController : ApiController
    {
       
        //GET-  מחזיר רשימה של כל המשתמשים בעיר שלי לפי כמות נקודות.
        [HttpPost]
        [Route("api/Competition/GetListOfUsersInMyCity")]
        public dynamic GetListOfUsersInMyCity([FromBody] tblUser selectedUser)
        {
            SmarTrashDBContext db = new SmarTrashDBContext();
            var ListUsersInCity = new Dictionary<int, object>();
            // var sums = new Dictionary<string, object>();
            var sums = new List<Throw>();

            var User = db.tblUser.Where(x => x.UserEmail == selectedUser.UserEmail).FirstOrDefault();
            var usersInCity = db.tblUser.Where(t => t.CityId == User.CityId).ToList();
            var competitionPlaces = db.tblCurrentThrow.Where(y => y.DateThrow.Year == DateTime.Now.Year && y.DateThrow.Month == DateTime.Now.Month).GroupBy(i => i.UserEmail).ToList();

            foreach (var useriIncity in usersInCity)
            {
                foreach (var e in competitionPlaces)
                {
                    if (e.Key == useriIncity.UserEmail)
                    {
                        //sums.Add(useriIncity.FirstName + ' ' + useriIncity.LastName, e.Sum(x => x.ThrowPoints));
                        Throw t = new Throw();
                        t.email = useriIncity.UserEmail;
                        t.fullName = useriIncity.FirstName + ' ' + useriIncity.LastName;
                        t.throws = e.Sum(x => x.ThrowPoints);
                        sums.Add(t);
                    }
                }
            }
            var userPlace = sums.OrderByDescending(x => x.throws);

            return userPlace;
        }

  
        // GET api/Competition/GetCompGift
        [HttpGet]
        [Route("api/Competition/GetCompGift")]
        //מביא את ההטבה של התחרות החודשית לאותו החודש
        public IHttpActionResult GetCompGift()
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                var MonthGift = db.tblSelectedMonthGift.Select(x => x.IdMonthGift).ToList().First();
                var gift = db.tblGift.Where(x =>x.GiftId == MonthGift);
                tblGift MGift = new tblGift();
                MGift.GiftId = gift.First().GiftId;
                MGift.GiftName = gift.First().GiftName;
                MGift.GiftDescription = gift.First().GiftDescription;
                MGift.Brand = gift.First().Brand;
                MGift.Price = gift.First().Price;
                MGift.Stock = gift.First().Stock;
                MGift.GiftCategory = gift.First().GiftCategory;
                MGift.GiftImage = gift.First().GiftImage;
                MonthGift = MGift.GiftId;
                return Ok(MGift);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }

        }
    }
}