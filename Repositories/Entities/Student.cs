using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Repositories.Entities
{
    [Table("Students")]
    public class Student : BaseEntity
    {
        [Required, StringLength(10)]
        public string NRIC { get; set; }
        [Required, StringLength(50)]
        public string Name { get; set; }
        [Required, StringLength(2)]
        public string Gender { get; set; }
        [Required]
        public DateTime Birthday { get; set; }
        public DateTime? AvailableDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public virtual IEnumerable<StudentSubject> Subjects { get; set; }
    }
}
