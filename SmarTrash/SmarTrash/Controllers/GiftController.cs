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


        //[HttpPost]
        //[Route("api/Gift/AddNewAddress")]
        //public void AddNewAddress([FromBody] tblOrder newAddress)
        //{
        //    newAddr.StreetNameAndNumber = newAddress.StreetNameAndNumber;
        //    newAddr.City = newAddress.City;
        //    newAddr.OrderPhone = newAddress.OrderPhone;
           
        //}


        //// GET api/Gift/addOrderLine/{giftCode}
        //[HttpPost]
        //[Route("api/Gift/addOrderLine/{giftCode}")]
        //// בודק אם למשתמש יש מספיק נקודות להזמנת ההטבה
        //public IHttpActionResult addOrderLine(int giftCode,[FromBody] tblUser u)
        //{
        //    try
        //    {
        //        SmarTrashDBContext db = new SmarTrashDBContext();
        //        tblGift gift = db.tblGift.Where(y => y.GiftId == giftCode).FirstOrDefault();
        //        gift.Stock -= 1;
        //        tblUser user = db.tblUser.Where(x => x.UserEmail == u.UserEmail).FirstOrDefault();
        //        user.TotalPoints -= gift.Price;
                
        //        tblOrder newOrder = new tblOrder();
        //        if (newAddr == null)
        //        {
        //            newOrder.StreetNameAndNumber = u.StreetNameAndNumber;
        //            newOrder.OrderPhone = u.Phone;
        //            newOrder.City = u.CityId;
        //        }
        //        else
        //        {
        //            newOrder.StreetNameAndNumber = newAddr.StreetNameAndNumber;
        //            newOrder.OrderPhone = newAddr.OrderPhone;
        //            newOrder.City = newAddr.City;
        //        }
        //        newOrder.GiftCode = giftCode;
        //        newOrder.UserEmail = u.UserEmail;
        //        db.tblOrder.Add(newOrder);
        //        db.SaveChanges();
        //        return Ok("ההזמנה בוצעה בהצלחה");
        //    }
        //    catch (Exception ex)
        //    {
        //        return Content(HttpStatusCode.BadRequest, ex);
        //    }
           
        //}
    
    }
}