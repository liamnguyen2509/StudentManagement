using System;

namespace StudentManagement.App.ViewModels
{
    public class StudentIndexVM
    {
        public Guid StudentId { get; set; }
        public int SN { get; set; }
        public string NRIC { get; set; }
        public string StudentName { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public int TotalSubject { get; set; }
    }
}
