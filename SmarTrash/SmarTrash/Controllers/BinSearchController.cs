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
        [HttpGet]
        [Route("api/BinSearch/GetBin")]
        public IHttpActionResult GetBinsInCity([FromBody] tblUser user)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                tblUser u = db.tblUser.Where(x => x.UserEmail == user.UserEmail).FirstOrDefault();
                var binsListInUserCity = db.tblSpecificBin.Where(x => x.CityId == u.CityId).Select(i => i.Address).ToList();
                return Ok(binsListInUserCity);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }

       
    }
}
