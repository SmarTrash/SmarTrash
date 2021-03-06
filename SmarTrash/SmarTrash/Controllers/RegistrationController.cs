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
        //מביא את כל רשימת הערים כדי שהמשתמש יבחר אחת
        public IHttpActionResult Get()
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                dynamic c = db.tblCity.Select(x => new {
                    CityName = x.CityName,
                    CityId = x.CityId
                }).ToList();
                return Ok(c);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }


        // POST: api/Registration
        //מילוי פרטים ושמירת משתמש חדש בדאטהבייס.
        public IHttpActionResult Post([FromBody] tblUser value)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                tblUser newUser = new tblUser();
                newUser.UserEmail = value.UserEmail;
                newUser.FirstName = value.FirstName;
                newUser.LastName = value.LastName;
                newUser.Phone = value.Phone;
                newUser.Gender = value.Gender;
                newUser.BirthDate = value.BirthDate;
                newUser.Password = value.Password;
                newUser.StreetNameAndNumber = value.StreetNameAndNumber;
                newUser.CityId = value.CityId;
                newUser.UserImg = value.UserImg;
                newUser.TotalPoints = 0;
                db.tblUser.Add(newUser);
                db.SaveChanges();

                return Ok(new { status = 201, isSuccess = true, message = "ההרשמה התבצעה בהצלחה", });
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}