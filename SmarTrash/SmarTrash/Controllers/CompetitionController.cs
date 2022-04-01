﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Data;
namespace SmarTrash.Controllers
{
    public class CompetitionController : ApiController
    {
        int g = 0;
        //GET- רשימה של כל המשתמשים בעיר שלי.

        [HttpGet]
        [Route("api/Competition/GetListOfUsersInMyCity")]
        public dynamic GetListOfUsersInMyCity()
        {
            SmarTrashDBContext db = new SmarTrashDBContext();
            var user = db.tblUser.ToList();
            var city = db.tblCity.Select(z => z.CityId).ToList();
            var ListUsersInCity = new Dictionary<int, object>();
            var sums = new Dictionary<string, object>();
            //רשימה של משתמשים לפי עיר
            foreach (var c in city)
            {
                sums = new Dictionary<string, object>();
                foreach (var u in user)
                {
                    if (u.CityId == c)
                    {
                        var User = db.tblUser.Where(x => x.UserEmail == u.UserEmail).ToList();
                        var cityIdUser = User.Select(x => x.CityId).First();
                        var usersInCity = db.tblUser.Where(t => t.CityId == cityIdUser).Select(z => z.UserEmail).ToList();
                        var competitionPlaces = db.tblCurrentThrow.Where(y => y.DateThrow.Year == DateTime.Now.Year && y.DateThrow.Month == DateTime.Now.Month).GroupBy(i => i.UserEmail).ToList();

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

                        ListUsersInCity.Add(c, userPlace);
                        break;
                    }
                }
            }

            return ListUsersInCity;
        }

        [HttpGet]
        [Route("api/Competition/GetAllWinnersInCities")]
        //איך שומרים פעם החודש????
        //מחזיר את רשימת הזוכים לפי חודש (נוכחי) בכל עיר.
        public dynamic GetAllWinnersInCities()
        {
            SmarTrashDBContext db = new SmarTrashDBContext();
            var user = db.tblUser.ToList();
            var city = db.tblCity.Select(z => z.CityId).ToList();
            var ListWinnersInCity = new Dictionary<int, object>();
            var sums = new Dictionary<string, object>();
            foreach (var c in city)
            {
                sums = new Dictionary<string, object>();
                foreach (var u in user)
                {
                    if (u.CityId == c)
                    {
                        var User = db.tblUser.Where(x => x.UserEmail == u.UserEmail).ToList();
                        var cityIdUser = User.Select(x => x.CityId).First();
                        var usersInCity = db.tblUser.Where(t => t.CityId == cityIdUser).Select(z => z.UserEmail).ToList();
                        var competitionPlaces = db.tblCurrentThrow.Where(y => y.DateThrow.Year == DateTime.Now.Year && y.DateThrow.Month == DateTime.Now.Month).GroupBy(i => i.UserEmail).ToList();

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
                        var userPlace = sums.OrderByDescending(x => x.Value).First();
                        //להכניס לדאטה בייס את המקומות הראשונים בתחרות בכל עיר
                        //tblGiftCompetition winners = new tblGiftCompetition();
                        //winners.CityId =userPlace.Key;
                        //winners.GiftId = g;
                        //winners.UserEmail = userPlace.Value;
                        ListWinnersInCity.Add(c, userPlace);
                        break;
                    }
                }
            }
         
           
            return ListWinnersInCity;
        }
        // GET api/Competition/GetCompGift
        [HttpGet]
        [Route("api/Competition/GetCompGift")]
        //מביא את ההטבה של התחרות החודשית לאותו החודש
        public IHttpActionResult GetCompGift()
        {
            try
            {
                SmarTrashDBContext db = new SmarTrashDBContext();
                var rand = new Random();
                var gift = db.tblGift.AsEnumerable().OrderBy(r => rand.Next()).Take(1).ToList();

                tblGift MGift = new tblGift();
                MGift.GiftId = gift.First().GiftId;
                MGift.GiftName = gift.First().GiftName;
                MGift.GiftDescription = gift.First().GiftDescription;
                MGift.Brand = gift.First().Brand;
                MGift.Price = gift.First().Price;
                MGift.Stock = gift.First().Stock;
                MGift.GiftCategory = gift.First().GiftCategory;
                MGift.GiftImage = gift.First().GiftImage;
                g = MGift.GiftId;
                return Ok(MGift);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }

        }
    }
}
