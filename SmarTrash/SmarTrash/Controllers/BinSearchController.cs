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
        // GET: api/BinSearch
        //GET- מקבל את המשתמש ומביא רשימת פחים בעיר שלו.
        [HttpGet]
        [Route("api/BinSearch/GetBin")]
        public IEnumerable<string> GetBin([FromBody] tblUser user)
        {
            SmarTrashDBContext db = new SmarTrashDBContext();

            var binsListInUserCity = db.tblSpecificBin.Where(x => x.CityId == user.CityId ).Select(i => i.Address).ToList();

            return binsListInUserCity;


        }

        // GET: api/BinSearch/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/BinSearch
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/BinSearch/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/BinSearch/5
        public void Delete(int id)
        {
        }
    }
}
