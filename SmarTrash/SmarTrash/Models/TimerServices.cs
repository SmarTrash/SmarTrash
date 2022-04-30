using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using Data;
namespace SmarTrash.Models
{
    //code for timer
    public static class TimerServices
    {
        //code for timer
        public static void DoSomethingWithtimer(string path)
        {
            //מביא את ההטבה של התחרות החודשית לאותו החודש

            SmarTrashDBContext db = new SmarTrashDBContext();
            var rand = new Random();
            var gift = db.tblGift.AsEnumerable().OrderBy(r => rand.Next()).Take(1).ToList();


            tblSelectedMonthGift MGift = new tblSelectedMonthGift();
            MGift.IdMonthGift = gift.First().GiftId;

            int m = DateTime.Now.Month;
            int y = DateTime.Now.Year;

            MGift.MonthGift = ((byte)m);
            MGift.YearGift = y;
            db.tblSelectedMonthGift.Add(MGift);
            db.SaveChanges();
        }



        //מחזיר את רשימת הזוכים לפי חודש (נוכחי) בכל עיר.
        public static void PostAllWinnersInCities(string path)
        {
            int count = 0;
            SmarTrashDBContext db = new SmarTrashDBContext();
            var MonthGift = db.tblSelectedMonthGift.Select(x => x.IdMonthGift).ToList().First();

            var user = db.tblUser.ToList();
            var city = db.tblCity.ToList();

            var ListWinnersInCity = new Dictionary<string, object>();
            var sums = new Dictionary<string, object>();

            tblGiftCompetition winners = new tblGiftCompetition();
            int year = DateTime.Now.Year;
            var month = DateTime.Now.Month;
            foreach (var c in city)
            {
                sums = new Dictionary<string, object>();
                winners = new tblGiftCompetition();
                foreach (var u in user)
                {
                    if (u.CityId == c.CityId)
                    {
                        var usersInCity = db.tblUser.Where(t => t.CityId == c.CityId).Select(z => z.UserEmail).ToList();
                        var competitionPlaces = db.tblCurrentThrow.Where(y => y.DateThrow.Year == year && y.DateThrow.Month == month).GroupBy(i => i.UserEmail).ToList();

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
                        if (count == competitionPlaces.Count)
                        {
                            return;
                        }
                        else
                        {
                            count++;
                            var userPlace = sums.OrderByDescending(x => x.Value).First();
                            winners.Year = Convert.ToInt16(year);
                            winners.Month = Convert.ToByte(month);
                            winners.CityId = c.CityId;
                            winners.GiftId = MonthGift;
                            winners.UserEmail = userPlace.Key;
                            db.tblGiftCompetition.Add(winners);
                            db.SaveChanges();
                            ListWinnersInCity.Add(c.CityName, userPlace);
                            break;
                        }
                    }
                }
            }
        }
    }
}