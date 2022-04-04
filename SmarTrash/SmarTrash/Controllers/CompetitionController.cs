using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Data;
namespace SmarTrash.Controllers
{
    public class CompetitionController : ApiController
    {
        int MonthGift = 0;

        //GET-  מחזיר רשימה של כל המשתמשים בעיר שלי לפי כמות נקודות.
        [HttpGet]
        [Route("api/Competition/GetListOfUsersInMyCity")]
        public dynamic GetListOfUsersInMyCity([FromBody] tblUser selectedUser)
        {
            SmarTrashDBContext db = new SmarTrashDBContext();
            var ListUsersInCity = new Dictionary<int, object>();
            var sums = new Dictionary<string, object>();

            var User = db.tblUser.Where(x => x.UserEmail == selectedUser.UserEmail).FirstOrDefault();
            var usersInCity = db.tblUser.Where(t => t.CityId == User.CityId).ToList();
            var competitionPlaces = db.tblCurrentThrow.Where(y => y.DateThrow.Year == DateTime.Now.Year && y.DateThrow.Month == DateTime.Now.Month).GroupBy(i => i.UserEmail).ToList();

            foreach (var useriIncity in usersInCity)
            {
                foreach (var e in competitionPlaces)
                {
                    if (e.Key == useriIncity.UserEmail)
                    {
                        sums.Add(useriIncity.FirstName + ' ' + useriIncity.LastName, e.Sum(x => x.ThrowPoints));
                    }
                }
            }
            var userPlace = sums.OrderByDescending(x => x.Value);

            return userPlace;
        }

        [HttpPost]
        [Route("api/Competition/GetAllWinnersInCities")]
      
        //מחזיר את רשימת הזוכים לפי חודש (נוכחי) בכל עיר.
        public dynamic PostAllWinnersInCities()
        {
            SmarTrashDBContext db = new SmarTrashDBContext();
            var user = db.tblUser.ToList();
            var city = db.tblCity.ToList();

            var ListWinnersInCity = new Dictionary<string, object>();
            var sums = new Dictionary<string, object>();

            tblGiftCompetition winners = new tblGiftCompetition();
            int year = DateTime.Now.Year;
            var month = DateTime.Now.Month;
            GetCompGift();
            foreach (var c in city)
            {
                sums = new Dictionary<string, object>();
                winners = new tblGiftCompetition();
                foreach (var u in user)
                {
                    if (u.CityId == c.CityId)
                    {
                        var usersInCity = db.tblUser.Where(t => t.CityId == c.CityId).Select(z => z.UserEmail).ToList();
                        var competitionPlaces = db.tblCurrentThrow.Where(y => y.DateThrow.Year == year && y.DateThrow.Month == month).GroupBy(i => i.UserEmail).ToList();

                        foreach (var useriIncity in usersInCity)
                        {
                            foreach (var e in competitionPlaces)
                            {
                                if (e.Key == useriIncity)
                                {
                                    sums.Add(e.Key, e.Sum(x => x.ThrowPoints));
                                }
                            }
                        }
                        var userPlace = sums.OrderByDescending(x => x.Value).First();
                        winners.Year =Convert.ToInt16(year);
                        winners.Month = Convert.ToByte(month);
                        winners.CityId =c.CityId;
                        winners.GiftId = MonthGift;
                        winners.UserEmail = userPlace.Key;
                        db.tblGiftCompetition.Add(winners);
                        db.SaveChanges();
                        ListWinnersInCity.Add(c.CityName, userPlace);
                        break;
                    }
                }
            }

            return ListWinnersInCity;
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
                var rand = new Random();
                var gift = db.tblGift.AsEnumerable().OrderBy(r => rand.Next()).Take(1).ToList();

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
