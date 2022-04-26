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
        [Route("api/Homepage/HomePageGifts")]
        public IHttpActionResult HomePageGifts()
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                dynamic listTop3 = GetTop3();
                dynamic popularGifts = "";
                List<dynamic> gifts = new List<dynamic>();
                foreach (var item in listTop3)
                {
                    int z = item.giftcode;
                    popularGifts = db.tblGift.Where(x => x.GiftId == z).Select(y => new
                    {
                        GiftId = y.GiftId,
                        GiftName = y.GiftName,
                        GiftDescription = y.GiftDescription,
                        Brand = y.Brand,
                        Price = y.Price,
                        Image = y.GiftImage,
                        Stock = y.Stock
                    }).ToList();
                    gifts.Add(popularGifts);
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
                    //מביא את קוד ההטבות ואת מספר הקניות שלהם
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
        [HttpPost]
        //מקבל מייל ומחזיר את הפרטים שלו שצריך לדף הבית
        public IHttpActionResult HomePageDetails([FromBody] tblUser u)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                var User = db.tblUser.Where(x => x.UserEmail == u.UserEmail).FirstOrDefault();
                int lastPoints = db.tblCurrentThrow.Where(y => y.UserEmail == u.UserEmail).OrderByDescending(x => x.DateThrow).FirstOrDefault().ThrowPoints;
                int userInComp = GetUserPlaceInCompetition(User);

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

        //מקבל מייל ומחזיר את המקום שלו בתחרות החודשית באזור שלו. מופעלת בפונקציה הקודמת
        public int GetUserPlaceInCompetition(tblUser u)
        {
            SmarTrashDBContext db = new SmarTrashDBContext();
            //  רשימה של משתמשים לפי עיר לבדוק שהחודש מעודכן בSql
            var usersInCity = db.tblUser.Where(t => t.CityId == u.CityId).Select(z => z.UserEmail).ToList();
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
            int id = userPlace.ToList().FindIndex(x => x.Key == u.UserEmail);
            id += 1;
            return id;
        }

        // PUT: api/HomePage/UpdateDetails
        [Route("api/HomePage/UpdateDetails")]
        [HttpPut]
        //מקבל מייל ומעדכן את הפרטים שלו 
        public IHttpActionResult UpdateDetails([FromBody] tblUser u)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                tblUser userToUpdate = db.tblUser.Where(x => x.UserEmail == u.UserEmail).FirstOrDefault();
                userToUpdate.FirstName = u.FirstName;
                userToUpdate.LastName = u.LastName;
                userToUpdate.Phone = u.Phone;
                userToUpdate.Gender = u.Gender;
                userToUpdate.BirthDate = u.BirthDate;
                userToUpdate.Password = u.Password;
                userToUpdate.StreetNameAndNumber = u.StreetNameAndNumber;
                userToUpdate.CityId = u.CityId;
                userToUpdate.UserImg = u.UserImg;
                db.SaveChanges();
                return Ok("פרטי המשתמש עודכנו בהצלחה");
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }


        // Delete: api/HomePage/DeleteUser
        [Route("api/HomePage/DeleteUser")]
        [HttpDelete]
        //מחיקת משתמש 
        public IHttpActionResult DeleteUser([FromBody] tblUser u)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                tblUser userToDelete = db.tblUser.Where(x => x.UserEmail == u.UserEmail).FirstOrDefault();
                db.tblUser.Remove(userToDelete);
                db.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
