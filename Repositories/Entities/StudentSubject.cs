using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Repositories.Entities
{
    [Table("StudentSubjects")]
    public class StudentSubject : BaseEntity
    {
        [ForeignKey("Student")]
        [Required]
        public Guid StudentId { get; set; }
        [ForeignKey("Subject")]
        [Required]
        public Guid SubjectId { get; set; }

        public virtual Student Student { get; set; }
        public virtual Subject Subject { get; set; }
    }
}
