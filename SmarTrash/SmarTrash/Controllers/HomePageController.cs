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
        //מפעיל את הפונקציה של הטופ 3 ומביא את כל הפרטים שלהן מטבלת הטבות
        [HttpGet]
        [Route("api/HomePage/HomePageGifts")]
        public dynamic HomePageGifts()
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
                    GiftId = y.GiftId,
                    GiftName = y.GiftName,
                    GiftDescription = y.GiftDescription,
                    Brand = y.Brand,
                    Price = y.Price,
                    Image = y.GiftImage,
                    //בשביל בדיקה אם יש במלאי גם את המלאי
                    Stock = y.Stock
                }).ToList();
                gifts.Add(popularGift);
            }

            return gifts;
        }
        // מחזיר את שלושת ההטבות הכי נמכרות מטבלת הזמנות 
        public dynamic GetTop3()
        {
            SmarTrashDBContext db = new SmarTrashDBContext();

            dynamic top3Gifts = db.tblOrder.GroupBy(x => x.GiftCode).Select(y => new
            {
                giftcode = y.Key,
                count = y.Count()
              
            }).OrderByDescending(y => y.count).Take(3);

            return top3Gifts;
        }


       
        public int GetUserPlaceInCompetition(string u)
        {
            SmarTrashDBContext db = new SmarTrashDBContext();
            //מחזיר רשימה של האימיילים ולכל אחד את הזריקות של החודש והשנה הנוכחי
            //צריך לסכום לכל אחד את הנקודות ולקבל את המספר של המקום של האימייל הספציפי
            var User = db.tblUser.Where(x => x.UserEmail == u).ToList();
            var cityIdUser = User.Select(x => x.CityId).First();

            //רשימה של משתמשים לפי עיר
            var usersInCity = db.tblUser.Where(t => t.CityId == cityIdUser).Select(z => z.UserEmail).ToList();
            var competitionPlaces=db.tblCurrentThrow.Where(y => y.DateThrow.Year == DateTime.Now.Year && y.DateThrow.Month == DateTime.Now.Month).GroupBy(i => i.UserEmail).ToList();
            
            var sums = new Dictionary<string, object>();
           
            foreach (var useriIncity in usersInCity)
            {   
                foreach (var e in competitionPlaces)
                {
                    if (e.Key== useriIncity)
                    {
                        sums.Add(e.Key, e.Sum(x => x.ThrowPoints));
                    }
                }
            }
            var userPlace = sums.OrderByDescending(x => x.Value);
            int id = userPlace.ToList().FindIndex(x => x.Key == u);
            id += 1;
            return id;
           }

        // GET: api/HomePage/5
        [Route("api/HomePage")]
        [HttpGet]
        //מקבל מייל ומחזיר את הפרטים שלו שצריך לדף הבית
        public dynamic HomePageDetails([FromBody] tblUser u)
        {
            SmarTrashDBContext db = new SmarTrashDBContext();
            int lastPoints = db.tblCurrentThrow.Where(y => y.UserEmail == u.UserEmail).OrderByDescending(x => x.DateThrow).FirstOrDefault().ThrowPoints;
           int userInComp= GetUserPlaceInCompetition(u.UserEmail);
            dynamic userDetails = db.tblUser.Where(x => x.UserEmail == u.UserEmail).Select(y => new
            {
                First = y.FirstName,
                Last = y.LastName,
                Img = y.UserImg,
                Points = y.TotalPoints,
                lastThrow = lastPoints,
                competitionPlace = userInComp
            }).ToList();
            return userDetails;
        }

    }
}
