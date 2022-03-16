using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Data;

namespace SmarTrash.Controllers
{
    public class RegistrationController : ApiController
    {
        // GET: api/Registration
        //מביא את כל רשימת הערים כדי שהמשתמש שנבחר יבחר אחת
        public dynamic Get()
        {
            SmarTrashDBContext db = new SmarTrashDBContext();
            dynamic c = db.tblCity.Select(x => new { CityName = x.CityName, CityId = x.CityId}).ToList();
            return c;
        }

        // GET: api/Registration/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/Registration
        //הוספה ושמירת משתמש חדש בדאטהבייס.
        public void Post([FromBody] tblUser value)
        {
            SmarTrashDBContext db = new SmarTrashDBContext();
            tblUser newUser = new tblUser();
            newUser.UserEmail=value.UserEmail;
            newUser.FirstName = value.FirstName;
            newUser.LastName = value.LastName;
            newUser.Phone = value.Phone;
            newUser.Gender = value.Gender;
            newUser.BirthDate = value.BirthDate;
            newUser.Password = value.Password;
            newUser.StreetNameAndNumber = value.StreetNameAndNumber;
            newUser.CityId = value.CityId;
            newUser.UserImg = value.UserImg;

            db.tblUser.Add(newUser);
            db.SaveChanges();

        }

        // PUT: api/Registration/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Registration/5
        public void Delete(int id)
        {
        }
    }
}
