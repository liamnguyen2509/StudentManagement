using System;
using System.ComponentModel.DataAnnotations;

namespace Repositories.Entities
{
    public class BaseEntity
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
    }
}
