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
       
        // Post api/Gift/GiftOrder/{g}
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
                newOrder.StreetNameAndNumber = user.StreetNameAndNumber;
                newOrder.OrderPhone = user.Phone;
                newOrder.GiftCode = g;
                newOrder.UserEmail = user.UserEmail;
                newOrder.City = user.CityId;
                newOrder.OrderNumber = 1;
                db.tblOrder.Add(newOrder);
                db.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }

        // GET api/Gift/AbleToOrder/{g}
        [HttpGet]
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

        // GET: api/Gift/ShippingDetails/{g}
        [HttpGet]
        [Route("api/Gift/ShippingDetails/{g}")]
        //מקבל מייל ומחזיר את פרטי המשלוח שלו, הנקודות שלו ומחיר ההטבה
        public IHttpActionResult ShippingDetails(int g,[FromBody] tblUser u)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                tblGift gift = db.tblGift.Where(y => y.GiftId == g).FirstOrDefault();
                var shippingDetails = (from users in db.tblUser
                              join cities in db.tblCity
                              on users.CityId  equals cities.CityId 
                              where users.UserEmail == u.UserEmail
                              select new
                              {
                                  StreetNameAndNumber = users.StreetNameAndNumber,
                                  city = cities.CityName,
                                  Phone = users.Phone,
                                  points= users.TotalPoints,
                                  price= gift.Price
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