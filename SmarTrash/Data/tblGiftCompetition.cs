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
    
    public partial class tblGiftCompetition
    {
        public int CityId { get; set; }
        public int GiftId { get; set; }
        public short Year { get; set; }
        public byte Month { get; set; }
        public string UserEmail { get; set; }
    
        public virtual tblCity tblCity { get; set; }
        public virtual tblGift tblGift { get; set; }
        public virtual tblUser tblUser { get; set; }
    }
}
