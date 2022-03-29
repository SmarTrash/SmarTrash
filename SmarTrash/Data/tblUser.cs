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
    
    public partial class tblUser
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblUser()
        {
            this.tblCurrentThrow = new HashSet<tblCurrentThrow>();
            this.tblGiftCompetition = new HashSet<tblGiftCompetition>();
            this.tblOrder = new HashSet<tblOrder>();
            this.tblScanProduct = new HashSet<tblScanProduct>();
        }
    
        public string UserEmail { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public System.DateTime BirthDate { get; set; }
        public string Password { get; set; }
        public Nullable<int> TotalPoints { get; set; }
        public Nullable<double> Longitude { get; set; }
        public Nullable<double> Latitude { get; set; }
        public string StreetNameAndNumber { get; set; }
        public Nullable<System.DateTime> LastGameDate { get; set; }
        public Nullable<int> CityId { get; set; }
        public string UserImg { get; set; }
    
        public virtual tblCity tblCity { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblCurrentThrow> tblCurrentThrow { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblGiftCompetition> tblGiftCompetition { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblOrder> tblOrder { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblScanProduct> tblScanProduct { get; set; }
    }
}