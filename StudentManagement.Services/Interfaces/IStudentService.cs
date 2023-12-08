using Repositories.Entities;
using StudentManagement.Services.Common;
using System;
using System.Collections.Generic;

namespace StudentManagement.Services.Interfaces
{
    public interface IStudentService
    {
        List<Student> GetStudents(DataTableAjaxPostModel model, out int filteredResultsCount, out int totalResultsCount);
        bool IsDuplicateNRIC(string nric);
        Student GetStudent(Guid id);
        Student CreateStudent(Student model);
        bool UpdateStudent(Student model);
    }
}
