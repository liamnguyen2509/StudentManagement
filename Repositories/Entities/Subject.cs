using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Repositories.Entities
{
    [Table("Subjects")]
    public class Subject : BaseEntity
    {
        [Required, StringLength(50)]
        public string Name { get; set; }

        public virtual IEnumerable<StudentSubject> Students { get; set; }
    }
}
