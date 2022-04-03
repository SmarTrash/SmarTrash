using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SmarTrash.Controllers
{
    public class ThrowController : ApiController
    {
 
        // POST api/Throw/ThrowGarbage
        [HttpPost]
        [Route("api/Throw/ThrowGarbage")]
        // זריקת פסולת, מוסיף את הזריקה לטבלת זריקות, מוסיף נקודות למשתמש, מוסיף את משקל הפסולת למשקל ומחזיר פרטים למסך  
        public IHttpActionResult ThrowGarbage([FromBody] tblUser user)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                tblCurrentThrow newThrow = new tblCurrentThrow();
                tblSpecificBin rndBin = RandomSpecicBin();
                float rndWeight = RandomWeight();
                short points= CalculatePoints(rndWeight);
                newThrow.DateThrow = DateTime.Today;
                newThrow.ThrowWeight = rndWeight;
                newThrow.ThrowPoints = points;
                newThrow.BinQRId = rndBin.BinQRId;
                newThrow.UserEmail = user.UserEmail;
                db.tblCurrentThrow.Add(newThrow);
                tblWeight w = db.tblWeight.Where(x => x.WeightId == rndBin.WeightId).FirstOrDefault();
                w.CurrentWeight += rndWeight;
                tblUser throwingUser = db.tblUser.Where(x => x.UserEmail == user.UserEmail).FirstOrDefault();
                throwingUser.TotalPoints += points;
                db.SaveChanges();
                dynamic detailsAfterThrow = db.tblUser.Where(x => x.UserEmail == user.UserEmail).Select(y => new
                {
                    First = y.FirstName,
                    throwenWeight = rndWeight,
                    gainedPoints = points,
                    totalPoints = y.TotalPoints
                }).ToList();
                return Content(HttpStatusCode.OK, detailsAfterThrow);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }


        // GET api/Throw/RandomSpecicBin
        [HttpGet]
        [Route("api/Throw/RandomSpecicBin")]
        // מביא פח ספציפי אקראי ברנדום
        public tblSpecificBin RandomSpecicBin()
        {  
                SmarTrashDBContext db = new SmarTrashDBContext();
                var rand = new Random();
                var randBin = db.tblSpecificBin.AsEnumerable().OrderBy(r => rand.Next()).Take(1).ToList();
                tblSpecificBin bin = new tblSpecificBin();
                bin.BinQRId = randBin.First().BinQRId;
                bin.Longitude = randBin.First().Longitude;
                bin.Latitude = randBin.First().Latitude;
                bin.Address = randBin.First().Address;
                bin.BinTypeId = randBin.First().BinTypeId;
                bin.WeightId = randBin.First().WeightId;
                return bin;
        }

        
        // GET api/Throw/RandomWeight
        [HttpGet]
        [Route("api/Throw/RandomWeight")]
        //רנדום של משקל פסולת שנזרקה בין 0 ל15 קילו
        public float RandomWeight()
        {
            Random rand = new Random();
            double min = 0;
            double max = 2;
            double range = max - min;
            double sample = rand.NextDouble();
            double scaled = (sample * range) + min;
            float f = (float)scaled;
            return f;
        }



        // GET api/Throw/CalculatePoints
        [HttpGet]
        [Route("api/Throw/CalculatePoints")]
        // מקבל משקל שנזרק ומחשב לו את הנקודות שנצברו
        public short CalculatePoints(float weight)
        {
            //double throwenWeight = Math.Round(w);
            double p = Math.Round(weight * 100);
            short points = ((short)p);
            return points;
        }

   
    }
}