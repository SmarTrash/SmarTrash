using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SmarTrash.Controllers
{

    public class GiftController : ApiController
    {
        // GET api/Gift/GetAllCategoryGifts
        [HttpGet]
        [Route("api/Gift/GetAllCategoryGifts")]
        //מביא את כל הקטגוריות
        public IHttpActionResult GetAllCategoryGifts()
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                var listOfCategory = db.tblCategory.Select(x => x.CategoryName).ToList();
                return Ok(listOfCategory);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }

        // GET api/Gift/GetAllGifts
        [HttpGet]
        [Route("api/Gift/GetAllGifts")]
        //מביא את כל ההטבות
        public IHttpActionResult GetAllGifts()
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                dynamic g = db.tblGift.Select(x => new
                {
                    GiftId = x.GiftId,
                    GiftName = x.GiftName,
                    GiftDescription = x.GiftDescription,
                    Brand = x.Brand,
                    Price = x.Price,
                    Image = x.GiftImage,
                    Stock = x.Stock,
                }).ToList();
                return Ok(g);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }

        // GET api/Gift/GetGiftsByCategory/{c}
        [HttpGet]
        [Route("api/Gift/GetGiftsByCategory/{c}")]
        // מביא את כל ההטבות של קטגוריה מסוימת
        public IHttpActionResult GetGiftsByCategory(int c)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                dynamic g = db.tblGift.Where(x => x.GiftCategory == c)
                    .Select(x => new
                    {
                        GiftId = x.GiftId,
                        GiftName = x.GiftName,
                        GiftDescription = x.GiftDescription,
                        Brand = x.Brand,
                        Price = x.Price,
                        Image = x.GiftImage,
                        //בשביל בדיקה אם יש במלאי גם את המלאי
                        Stock = x.Stock
                    }).ToList();
                if (g == null)
                {
                    return Content(HttpStatusCode.NotFound, "אין הטבות בקטגוריה זו");
                }

                return Ok(g);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }
        // GET api/Gift/GetGiftsByCategory/{gift}
        [HttpGet]
        [Route("api/Gift/GetSpecificGift/{gift}")]
        // מביא את הפרטים של הטבה מסויימת
        public IHttpActionResult GetSpecificGift(int gift)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                dynamic g = db.tblGift.Where(x => x.GiftId == gift)
                    .Select(x => new
                    {
                        GiftId = x.GiftId,
                        GiftName = x.GiftName,
                        GiftDescription = x.GiftDescription,
                        Brand = x.Brand,
                        Price = x.Price,
                        Image = x.GiftImage,
                        //בשביל בדיקה אם יש במלאי גם את המלאי
                        Stock = x.Stock
                    }).ToList();
                return Ok(g);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }


        }

        [HttpPost]
        [Route("api/Gift/GiftOrder/{g}")]
        // ביצוע הזמנת הטבה. הורדה מהמלאי שלה ומהנקודות של המשתמש. 
        public IHttpActionResult GiftOrder(int g, [FromBody] tblUser u)
        {

            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                tblGift gift = db.tblGift.Where(y => y.GiftId == g).FirstOrDefault();
                gift.Stock -= 1;
                tblUser user = db.tblUser.Where(x => x.UserEmail == u.UserEmail).FirstOrDefault();
                user.TotalPoints -= gift.Price;
                tblOrder newOrder = new tblOrder();
                newOrder.StreetNameAndNumber = u.StreetNameAndNumber;
                newOrder.OrderPhone = u.Phone;
                newOrder.GiftCode = g;
                newOrder.UserEmail = u.UserEmail;
                newOrder.City = u.CityId;
                newOrder.OrderDate = DateTime.Now;
                db.tblOrder.Add(newOrder);
                db.SaveChanges();
                tblUser userAfterChange = db.tblUser.Where(x => x.UserEmail == u.UserEmail).FirstOrDefault();
                return Ok(userAfterChange.TotalPoints);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }


        [HttpGet]
        [Route("api/Gift/GetUserOrders")]

        public IHttpActionResult GetUserOrders([FromBody] tblUser u)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                //List<tblOrder> newOrder= db.tblOrder.Where(y => y.UserEmail == u.UserEmail).ToList();

                var shippingDetails = (from order in db.tblOrder
                                       join gifts in db.tblGift
                                       on order.GiftCode equals gifts.GiftId
                                       where order.UserEmail == u.UserEmail
                                       select new
                                       {
                                           StreetNameAndNumber = order.StreetNameAndNumber,
                                           city = order.City,
                                           Phone = order.OrderPhone,
                                           giftName = gifts.GiftName,
                                           orderDate = order.OrderDate
                                       }).ToList();
                return Ok(shippingDetails);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }

        // GET api/Gift/AbleToOrder/{g}
        [HttpPost]
        [Route("api/Gift/AbleToOrder/{g}")]
        // בודק אם למשתמש יש מספיק נקודות להזמנת ההטבה
        public bool AbleToOrder(int g, [FromBody] tblUser u)
        {

            SmarTrashDBContext db = new SmarTrashDBContext();
            tblGift gift = db.tblGift.Where(y => y.GiftId == g).FirstOrDefault();
            tblUser user = db.tblUser.Where(x => x.UserEmail == u.UserEmail).FirstOrDefault();
            if (user.TotalPoints >= gift.Price)
            {
                return true;
            }
            return false;
        }

        // Post: api/Gift/ShippingDetails/{g}
        [HttpPost]
        [Route("api/Gift/ShippingDetails/{g}")]
        //מקבל מייל ומחזיר את פרטי המשלוח שלו, הנקודות שלו ומחיר ההטבה
        public IHttpActionResult ShippingDetails(int g, [FromBody] tblUser u)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                tblGift gift = db.tblGift.Where(y => y.GiftId == g).FirstOrDefault();
                var shippingDetails = (from users in db.tblUser
                                       join cities in db.tblCity
                                       on users.CityId equals cities.CityId
                                       where users.UserEmail == u.UserEmail
                                       select new
                                       {
                                           StreetNameAndNumber = users.StreetNameAndNumber,
                                           city = cities.CityName,
                                           Phone = users.Phone,
                                           points = users.TotalPoints,
                                           price = gift.Price,
                                       }).ToList();
                return Ok(shippingDetails);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }

    }
}