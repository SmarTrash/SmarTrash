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
        // Post: api/BinSearch/GetBin
        //Post- מקבל את המשתמש ומביא רשימת פחים בעיר שלו.
        [HttpPost]
        [Route("api/BinSearch/GetBin")]
        public IHttpActionResult GetBinsInCity([FromBody] tblUser user)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                tblUser u = db.tblUser.Where(x => x.UserEmail == user.UserEmail).FirstOrDefault();
                var binsDetails = (from binType in db.tblBinType
                                       join specificBin in db.tblSpecificBin
                                       on binType.BinTypeId equals specificBin.BinTypeId
                                       where specificBin.CityId == u.CityId
                                       select new
                                       {
                                           BinQRId = specificBin.BinQRId,
                                           Longitude = specificBin.Longitude,
                                           Latitude = specificBin.Latitude,
                                           Address = specificBin.Address,
                                           BinTypeId = specificBin.BinTypeId,
                                           WeightId = specificBin.WeightId,
                                           CityId = specificBin.CityId,
                                           BinTypeColor = binType.BinTypeColor,
                                           Description = binType.Description,
                                           
                                       }).ToList();
                return Ok(binsDetails);
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
