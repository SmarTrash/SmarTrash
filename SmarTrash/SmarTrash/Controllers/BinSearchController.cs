using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SmarTrash.Controllers
{
    public class BinSearchController : ApiController
    {
        // GET: api/BinSearch/GetBin
        //GET- מקבל את המשתמש ומביא רשימת פחים בעיר שלו.
        [HttpPost]
        [Route("api/BinSearch/GetBin")]
        public IHttpActionResult GetBinsInCity([FromBody] tblUser user)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                tblUser u = db.tblUser.Where(x => x.UserEmail == user.UserEmail).FirstOrDefault();
                var binsListInUserCity = db.tblSpecificBin.Where(x => x.CityId == u.CityId).Select(x => new
                {
                    BinQRId = x.BinQRId,
                    Longitude = x.Longitude,
                    Latitude = x.Latitude,
                    Address = x.Address,
                    BinTypeId = x.BinTypeId,
                    WeightId = x.WeightId,
                    CityId = x.CityId,
                }).ToList();
                
                return Ok(binsListInUserCity);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }

        //POST- מקבל מספר פח ובודק אם הוא נמצא, אם כן נשלח אמת.
        [HttpPost]
        [Route("api/BinSearch/MatchBin")]
        public dynamic GetBinsFromQR([FromBody] tblSpecificBin userBinQR)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();

                var listOfBin = db.tblSpecificBin.Select(x => x.BinQRId ).ToList();

                foreach (var bin in listOfBin)
                {
                    if (bin == userBinQR.BinQRId)
                    {
                        return true;
                    }
                }
                return false;
              
            }
            catch (Exception ex)
            {
                return false;
            }
        }


    }
}
