using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Data;

namespace SmarTrash.Controllers
{
    public class HomePageController : ApiController
    {
        // GET: api/HomePage/5
        [Route("api/HomePage/HomePageDetails")]
        [HttpPost]
        //מקבל מייל ומחזיר את הפרטים שלו שצריך לדף הבית
        public IHttpActionResult HomePageDetails([FromBody] tblUser u)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                var log = db.tblUser.Where(x => x.UserEmail == u.UserEmail && x.Password == u.Password).FirstOrDefault();
                if (log == null)
                {
                    return Ok(new { status = 404, isSuccess = false, message = "משתמש לא קיים במערכת", });
                }
                var User = db.tblUser.Where(x => x.UserEmail == u.UserEmail).FirstOrDefault();
                var Points = db.tblCurrentThrow.Where(y => y.UserEmail == u.UserEmail).OrderByDescending(x => x.DateThrow).FirstOrDefault();
                int lastPoints = 0;
                if (Points == null)
                {
                    lastPoints = 0;
                }
                else
                {
                    lastPoints = Points.ThrowPoints;
                }

                int userInComp = GetUserPlaceInCompetition(User);

                dynamic userDetails = db.tblUser.Where(x => x.UserEmail == u.UserEmail).Select(y => new
                {
                    First = y.FirstName,
                    Last = y.LastName,
                    birthDate = y.BirthDate,
                    cityId = y.CityId,
                    gender = y.Gender,
                    phone = y.Phone,
                    streetNum = y.StreetNameAndNumber,
                    Img = y.UserImg,
                    Points = y.TotalPoints,
                    lastThrow = lastPoints,
                    competitionPlace = userInComp
                }).ToList();

                return Ok(userDetails);

            }

            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }

        [Route("api/HomePage/PostToken")]
        [HttpPost]
        public IHttpActionResult PostToken([FromBody] tblUser u)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                tblUser user = db.tblUser.Where(x => x.UserEmail == u.UserEmail).FirstOrDefault();
                user.UserToken = u.UserToken;
                db.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }
        // GET: api/HomePage
        //מפעיל את הפונקציה של הטופ 3 ומביא את כל הפרטים שלהן מטבלת הטבות
        [HttpGet]
        [Route("api/Homepage/HomePageGifts")]
        public IHttpActionResult HomePageGifts()
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                dynamic listTop3 = GetTop3();
                dynamic popularGifts = "";
                List<dynamic> gifts = new List<dynamic>();
                foreach (var item in listTop3)
                {
                    int z = item.giftcode;
                    popularGifts = db.tblGift.Where(x => x.GiftId == z).Select(y => new
                    {
                        GiftId = y.GiftId,
                        GiftName = y.GiftName,
                        GiftDescription = y.GiftDescription,
                        Brand = y.Brand,
                        Price = y.Price,
                        Image = y.GiftImage,
                        Stock = y.Stock
                    }).ToList();
                    gifts.Add(popularGifts);
                }
                return Ok(gifts);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }


        // מחזיר את שלושת ההטבות הכי נמכרות מטבלת הזמנות. מופעלת בתוך פונקציה 
        public dynamic GetTop3()
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                dynamic top3Gifts = db.tblOrder.GroupBy(x => x.GiftCode).Select(y => new
                {
                    //מביא את קוד ההטבות ואת מספר הקניות שלהם
                    giftcode = y.Key,
                    count = y.Count()
                }).OrderByDescending(y => y.count).Take(3);
                return top3Gifts;
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }


        //מקבל מייל ומחזיר את המקום שלו בתחרות החודשית באזור שלו. מופעלת בפונקציה הקודמת
        public int GetUserPlaceInCompetition(tblUser u)
        {
            SmarTrashDBContext db = new SmarTrashDBContext();
            //  רשימה של משתמשים לפי עיר לבדוק שהחודש מעודכן בSql
            var usersInCity = db.tblUser.Where(t => t.CityId == u.CityId).Select(z => z.UserEmail).ToList();
            var competitionPlaces = db.tblCurrentThrow.Where(y => y.DateThrow.Year == DateTime.Now.Year && y.DateThrow.Month == DateTime.Now.Month).GroupBy(i => i.UserEmail).ToList();

            var sums = new Dictionary<string, object>();

            foreach (var useriIncity in usersInCity)
            {
                foreach (var e in competitionPlaces)
                {
                    if (e.Key == useriIncity)
                    {
                        sums.Add(e.Key, e.Sum(x => x.ThrowPoints));
                    }
                }
            }
            var userPlace = sums.OrderByDescending(x => x.Value);
            int id = userPlace.ToList().FindIndex(x => x.Key == u.UserEmail);
            id += 1;
            return id;
        }

        // PUT: api/HomePage/UpdateDetails
        [Route("api/HomePage/UpdateDetails")]
        [HttpPut]
        //מקבל מייל ומעדכן את הפרטים שלו 
        public IHttpActionResult UpdateDetails([FromBody] tblUser u)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                tblUser userToUpdate = db.tblUser.Where(x => x.UserEmail == u.UserEmail).FirstOrDefault();
                userToUpdate.FirstName = u.FirstName;
                userToUpdate.LastName = u.LastName;
                userToUpdate.Phone = u.Phone;
                userToUpdate.Gender = u.Gender;
                userToUpdate.BirthDate = u.BirthDate;
                userToUpdate.Password = u.Password;
                userToUpdate.StreetNameAndNumber = u.StreetNameAndNumber;
                userToUpdate.CityId = u.CityId;
                userToUpdate.UserImg = u.UserImg;
                db.SaveChanges();
                return Ok("פרטי המשתמש עודכנו בהצלחה");
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }


        // Delete: api/HomePage/DeleteUser
        [Route("api/HomePage/DeleteUser")]
        [HttpDelete]
        //מחיקת משתמש 
        public IHttpActionResult DeleteUser([FromBody] tblUser u)
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                tblUser userToDelete = db.tblUser.Where(x => x.UserEmail == u.UserEmail).FirstOrDefault();
                db.tblUser.Remove(userToDelete);
                db.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }

        // מעלה תמונה לשרת של רופין

        [Route("api/HomePage/uploadpicture")]
        public Task<HttpResponseMessage> Post()
        {
            string outputForNir = "start---";
            List<string> savedFilePath = new List<string>();
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            //Where to put the picture on server  ...MapPath("~/TargetDir")
            string rootPath = HttpContext.Current.Server.MapPath("~/uploadFiles");
            var provider = new MultipartFileStreamProvider(rootPath);
            var task = Request.Content.ReadAsMultipartAsync(provider).
                ContinueWith<HttpResponseMessage>(t =>
                {
                    if (t.IsCanceled || t.IsFaulted)
                    {
                        Request.CreateErrorResponse(HttpStatusCode.InternalServerError, t.Exception);
                    }
                    foreach (MultipartFileData item in provider.FileData)
                    {
                        try
                        {
                            outputForNir += " ---here";
                            string name = item.Headers.ContentDisposition.FileName.Replace("\"", "");
                            outputForNir += " ---here2=" + name;

                            //need the guid because in react native in order to refresh an inamge it has to have a new name
                            string newFileName = Path.GetFileNameWithoutExtension(name) + "_" + CreateDateTimeWithValidChars() + Path.GetExtension(name);
                            //string newFileName = Path.GetFileNameWithoutExtension(name) + "_" + Guid.NewGuid() + Path.GetExtension(name);
                            //string newFileName = name + "" + Guid.NewGuid();
                            outputForNir += " ---here3" + newFileName;

                            //delete all files begining with the same name
                            string[] names = Directory.GetFiles(rootPath);
                            foreach (var fileName in names)
                            {
                                if (Path.GetFileNameWithoutExtension(fileName).IndexOf(Path.GetFileNameWithoutExtension(name)) != -1)
                                {
                                    File.Delete(fileName);
                                }
                            }

                            //File.Move(item.LocalFileName, Path.Combine(rootPath, newFileName));
                            File.Copy(item.LocalFileName, Path.Combine(rootPath, newFileName), true);
                            File.Delete(item.LocalFileName);
                            outputForNir += " ---here4";

                            Uri baseuri = new Uri(Request.RequestUri.AbsoluteUri.Replace(Request.RequestUri.PathAndQuery, string.Empty));
                            outputForNir += " ---here5";
                            string fileRelativePath = "~/uploadFiles/" + newFileName;
                            outputForNir += " ---here6 imageName=" + fileRelativePath;
                            Uri fileFullPath = new Uri(baseuri, VirtualPathUtility.ToAbsolute(fileRelativePath));
                            outputForNir += " ---here7" + fileFullPath.ToString();
                            savedFilePath.Add(fileFullPath.ToString());
                        }
                        catch (Exception ex)
                        {
                            outputForNir += " ---excption=" + ex.Message;
                            string message = ex.Message;
                        }
                    }

                    return Request.CreateResponse(HttpStatusCode.Created, "nirchen " + savedFilePath[0] + "!" + provider.FileData.Count + "!" + outputForNir + ":)");
                });
            return task;
        }
        //מקבל מייל ומעדכן את התמונה שלו

        private string CreateDateTimeWithValidChars()
        {
            return DateTime.Now.ToString().Replace('/', ' ').Replace(':', '-').Replace(' ', ' ');
        }
        //מעדכן את התמנוה של המשתמש
        
        [Route("api/HomePage/updateUserImage/{userNewPicture}")]
        [HttpPost] 
        public IHttpActionResult UpdateUserImage([FromBody] tblUser u, string userNewPicture)
        {
            try 
            { 
            SmarTrashDBContext db = new SmarTrashDBContext();
            tblUser userToUpdate = db.tblUser.Where(x => x.UserEmail == u.UserEmail).FirstOrDefault();
            userToUpdate.UserImg = userNewPicture;
            db.SaveChanges();
                return Ok();
            }
              catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}