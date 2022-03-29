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
        // GET api/Gift/GetAllGifts
        [HttpGet]
        [Route("api/Gift/GetAllGifts")]
        //מביא את כל ההטבות
        public IHttpActionResult GetAllGifts()
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                dynamic g = db.tblGift.Select(x => new {
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



        // GET api/Gift/GetGiftsByCategory
        [HttpGet]
        [Route("api/Gift/GetGiftsByCategory/{c}")]
        // מביא את כל ההטבות של קטגוריה מסוימת
        public IHttpActionResult GetGiftsByCategory(int c)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                dynamic g = db.tblGift.Where(x => x.GiftCategory == c)
                    .Select(x => new {
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


        // GET api/Gift/GetGiftsByCategory
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

        //לאאאא להתייחסס עדיין לא נכון!
        // GET api/gift/GetCompGift
        [HttpGet]
        [Route("api/gift/GetCompGift")]
        //מביא את ההטבה של התחרות החודשית בחודש הנוכחי
        //צריך כנראה לשנות- או להוסיף טבלה או לעשות רנדום מהטבות
        public IHttpActionResult GetCompGift()
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                tblGiftCompetition g = db.tblGiftCompetition.SingleOrDefault(y => y.Year == DateTime.Now.Year && y.Month == DateTime.Now.Month);
                dynamic thisMonthGift = db.tblGift.Where(j => j.GiftId == g.GiftId).Select(x => new
                {
                    GiftId = x.GiftId,
                    GiftName = x.GiftName,
                    GiftDescription = x.GiftDescription,
                    Brand = x.Brand,
                    Price = x.Price,
                    Image = x.GiftImage,
                    //בשביל בדיקה אם יש במלאי גם את המלאי
                    Stock = x.Stock
                });
                return Ok(thisMonthGift);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }

        }
        // POST api/<controller>
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}