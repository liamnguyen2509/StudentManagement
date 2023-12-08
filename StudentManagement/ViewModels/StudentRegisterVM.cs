using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StudentManagement.App.ViewModels
{
    public class StudentRegisterVM
    {
        public string NRIC { get; set; }
        public string StudentName { get; set; }
        public string Gender { get; set; }
        [DataType(DataType.Date)]
        public DateTime DOB { get; set; }
        public DateTime? AvailableDate { get; set; }
        public List<Guid> SubjectIds { get; set; }
    }
}