using Repositories.Entities;
using Repositories.Repositories;
using StudentManagement.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace StudentManagement.Services
{
    public class SubjectService : ISubjectService
    {
        private readonly IGenericRepository<Subject> _subjectRepo;
        private readonly IGenericRepository<StudentSubject> _studentSubjectRepo;

        public SubjectService(IGenericRepository<Subject> subjectRepo, IGenericRepository<StudentSubject> studentSubjectRepo)
        {
            _subjectRepo = subjectRepo;
            _studentSubjectRepo = studentSubjectRepo;
        }

        public List<Subject> GetSubjects()
        {
            return _subjectRepo.ToQueryable().ToList();
        }

        public List<Subject> GetSubjectsByStudent(Guid studentId)
        {
            var subjectIds = _studentSubjectRepo.Where(x => x.StudentId == studentId).Select(a => a.SubjectId).ToList();
            var subjects = _subjectRepo.Where(a => subjectIds.Contains(a.Id));
            return subjects.ToList();
        }
    }
}
