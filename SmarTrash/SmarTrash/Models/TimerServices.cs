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
    }
}