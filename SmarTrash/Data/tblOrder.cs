//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class tblOrder
    {
        public int OrderNumber { get; set; }
        public string OrderPhone { get; set; }
        public Nullable<int> GiftCode { get; set; }
        public string UserEmail { get; set; }
        public Nullable<int> City { get; set; }
        public string StreetNameAndNumber { get; set; }
        public Nullable<System.DateTime> OrderDate { get; set; }
    
        public virtual tblCity tblCity { get; set; }
        public virtual tblGift tblGift { get; set; }
        public virtual tblUser tblUser { get; set; }
    }
}
