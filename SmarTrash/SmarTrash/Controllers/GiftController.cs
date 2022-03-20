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
        [HttpGet]
        [Route("api/Gift/GetAllGifts")]
        // GET api/Gift/GetAllGifts
        public dynamic GetAllGifts()
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

            return g;
          

        }
        [HttpGet]
        [Route("api/gift/getGiftsByCategory/{c}")]
        // GET api/Gift/GetGiftsByCategory
        public dynamic GetGiftsByCategory(int c)
        {
            SmarTrashDBContext db = new SmarTrashDBContext();
            dynamic g= db.tblGift.Where(x => x.GiftCategory== c)
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
            return g;

           
        }

        [HttpGet]
        [Route("api/gift/GetCompGift")]
        // GET api/gift/GetCompGift

        //מביא את ההטבה של התחרות החודשית בחודש הנוכחי
        //צריך כנראה לשנות- או להוסיף טבלה או לעשות רנדום מהטבות
        public dynamic GetCompGift()
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
            return thisMonthGift;

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