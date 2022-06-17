using System;
using System.Collections.Generic;
using System.Linq;
using System.Timers;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace SmarTrash
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        static Timer timer = new Timer();
        string path = null;
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            
            timer.Interval =1000 * 60 * 60 * 24 ;
            path = Server.MapPath("/"); 
            timer.Elapsed += tm_Tick;
           
            timer.Enabled = true;
            timer.AutoReset = true;
            timer.Start();
         
           
        
        }
        //code for timer
        private void tm_Tick(object sender, ElapsedEventArgs e)
        {
            DateTime date = DateTime.Now;
            int lastDayInMonth = DateTime.DaysInMonth(date.Year, date.Month);

            if (DateTime.Now.Day == 1)
            {
                SmarTrash.Models.TimerServices.DoSomethingWithtimer(path);
            }
            else if (DateTime.Now.Day == lastDayInMonth)
            {
                SmarTrash.Models.TimerServices.PostAllWinnersInCities(path);
            }
            else if (DateTime.Now.Day == 18)
            {
                SmarTrash.Models.TimerServices.Post(path);
            }
        }
        
        //code for timer
        public static void StartTimer()
        {
            timer.Enabled = true;

        }

        public static void EndTimer()
        {
            timer.Enabled = false;

        }
    }
}