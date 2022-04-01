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

        //GET- רשימה של הזוכים בתחרות בסוף החודש.

        [HttpGet]
        [Route("api/Homepage/GetAllWinners")]

        public void GetAllWinners()
        {

            SmarTrashDBContext db = new SmarTrashDBContext();
            var User = db.tblUser.ToList();
            var city = db.tblCity.Select(z=>z.CityId).ToList();
            //    //רשימה של משתמשים לפי עיר
            var usersInCity = new Dictionary<int, object>();
            foreach (var c in city)
            {
                foreach (var u in User)
                {
                    if (u.CityId == c)
                    {
                        usersInCity.Add(c, u.UserEmail);

                    }


                }
            }

            //    var competitionPlaces = db.tblCurrentThrow.Where(y => y.DateThrow.Year == DateTime.Now.Year && y.DateThrow.Month == DateTime.Now.Month).GroupBy(i => i.UserEmail).ToList();
            //    var sums = new Dictionary<string, object>();
            //    foreach (var useriIncity in usersInCity)
            //    {
            //        foreach (var e in competitionPlaces)
            //        {
            //            if (e.Key == useriIncity)
            //            {
            //                sums.Add(e.Key, e.Sum(x => x.ThrowPoints));
            //            }

            //        }
            //        var userPlace = sums.OrderByDescending(x => x.Value);
            //        int id = userPlace.ToList().FindIndex(x => x.Key == u);
            //        id += 1;



        }
    

    // GET: api/HomePage
    //מפעיל את הפונקציה של הטופ 3 ומביא את כל הפרטים שלהן מטבלת הטבות
    [HttpGet]
        [Route("api/Homepage/HomePageGifts")]
        public IHttpActionResult HomePageGifts()
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                dynamic listTop3 = GetTop3();
                dynamic popularGift = "";
                List<dynamic> gifts = new List<dynamic>();
                foreach (var item in listTop3)
                {
                    int z = item.giftcode;
                    popularGift = db.tblGift.Where(x => x.GiftId == z).Select(y => new
                    {
                        GiftId = y.GiftId,
                        GiftName = y.GiftName,
                        GiftDescription = y.GiftDescription,
                        Brand = y.Brand,
                        Price = y.Price,
                        Image = y.GiftImage,
                        Stock = y.Stock
                    }).ToList();
                    gifts.Add(popularGift);
                }
                if (gifts==null)
                {
                    return Content(HttpStatusCode.NotFound, "אין הטבות שהוזמנו עדיין");
                }
                return Ok(gifts);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }


        // מחזיר את שלושת ההטבות הכי נמכרות מטבלת הזמנות. מופעלת בתוך פונקציה 
        public dynamic GetTop3()
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                dynamic top3Gifts = db.tblOrder.GroupBy(x => x.GiftCode).Select(y => new
                {
                    giftcode = y.Key,
                    count = y.Count()
                }).OrderByDescending(y => y.count).Take(3);
                return top3Gifts;
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }




        // GET: api/HomePage/5
        [Route("api/HomePage/HomePageDetails")]
        [HttpGet]
        //מקבל מייל ומחזיר את הפרטים שלו שצריך לדף הבית
        public IHttpActionResult HomePageDetails([FromBody] tblUser u)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                int lastPoints = db.tblCurrentThrow.Where(y => y.UserEmail == u.UserEmail).OrderByDescending(x => x.DateThrow).FirstOrDefault().ThrowPoints;
                int userInComp = GetUserPlaceInCompetition(u.UserEmail);
                dynamic userDetails = db.tblUser.Where(x => x.UserEmail == u.UserEmail).Select(y => new
                {
                    First = y.FirstName,
                    Last = y.LastName,
                    Img = y.UserImg,
                    Points = y.TotalPoints,
                    lastThrow = lastPoints,
                    competitionPlace = userInComp
                }).ToList();
                return Ok(userDetails);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }

        }
        //מקבל מייל ומחזיר את המקום שלו בתחרות החודשית באזור שלו. מופעלת בפונקציה הבאה
        public int GetUserPlaceInCompetition(string u)
        {
            //try
            //{
            SmarTrashDBContext db = new SmarTrashDBContext();
            var User = db.tblUser.Where(x => x.UserEmail == u).ToList();
            var cityIdUser = User.Select(x => x.CityId).First();
            //רשימה של משתמשים לפי עיר
            var usersInCity = db.tblUser.Where(t => t.CityId == cityIdUser).Select(z => z.UserEmail).ToList();
            var competitionPlaces = db.tblCurrentThrow.Where(y => y.DateThrow.Year == DateTime.Now.Year && y.DateThrow.Month == DateTime.Now.Month).GroupBy(i => i.UserEmail).ToList();
            var sums = new Dictionary<string, object>();
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
            var userPlace = sums.OrderByDescending(x => x.Value);
            int id = userPlace.ToList().FindIndex(x => x.Key == u);
            id += 1;
            return id;
            //}
            //catch (Exception ex)
            //{
            //    return Content(HttpStatusCode.BadRequest, ex); 
            //}
            //איך עושים פה קאץ אם זה צריך להחזיר אינט לפונקציה הבאה 
        }


    }
}
