using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
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


        //public static void Post([FromBody] PushNotData pnd)
        //{
        //    // Create a request using a URL that can receive a post.
        //    WebRequest request = WebRequest.Create("https://exp.host/--/api/v2/push/send");
        //    // Set the Method property of the request to POST.
        //    request.Method = "POST";
        //    // Create POST data and convert it to a byte array.
        //    var objectToSend = new
        //    {
        //        to = pnd.to,
        //        title = pnd.title,
        //        body = pnd.body,
        //        badge = pnd.badge,
        //        data = pnd.data//new { name = "nir", grade = 100 }
        //    };
        //    string postData = new JavaScriptSerializer().Serialize(objectToSend);
        //    byte[] byteArray = Encoding.UTF8.GetBytes(postData);
        //    // Set the ContentType property of the WebRequest.
        //    request.ContentType = "application/json";
        //    // Set the ContentLength property of the WebRequest.
        //    request.ContentLength = byteArray.Length;
        //    // Get the request stream.
        //    Stream dataStream = request.GetRequestStream();
        //    // Write the data to the request stream.
        //    dataStream.Write(byteArray, 0, byteArray.Length);
        //    // Close the Stream object.
        //    dataStream.Close();
        //    // Get the response.
        //    WebResponse response = request.GetResponse();
        //    // Display the status.
        //    string returnStatus = ((HttpWebResponse)response).StatusDescription;
        //    //Console.WriteLine(((HttpWebResponse)response).StatusDescription);
        //    // Get the stream containing content returned by the server.
        //    dataStream = response.GetResponseStream();
        //    // Open the stream using a StreamReader for easy access.
        //    StreamReader reader = new StreamReader(dataStream);
        //    // Read the content.
        //    string responseFromServer = reader.ReadToEnd();
        //    // Display the content.
        //    //Console.WriteLine(responseFromServer);
        //    // Clean up the streams.
        //    reader.Close();
        //    dataStream.Close();
        //    response.Close();
        //    return "success:) --- " + responseFromServer + ", " + returnStatus;
        //}


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