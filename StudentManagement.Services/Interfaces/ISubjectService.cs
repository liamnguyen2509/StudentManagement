using Repositories.Entities;
using System;
using System.Collections.Generic;

namespace StudentManagement.Services.Interfaces
{
    public interface ISubjectService
    {
        List<Subject> GetSubjects();
        List<Subject> GetSubjectsByStudent(Guid studentId);
    }
}
