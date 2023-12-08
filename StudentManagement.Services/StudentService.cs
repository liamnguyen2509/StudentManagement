using Repositories;
using Repositories.Entities;
using Repositories.Repositories;
using StudentManagement.Services.Common;
using StudentManagement.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace StudentManagement.Services
{
    public class StudentService : IStudentService
    {
        private readonly IGenericRepository<Student> _studentRepo;
        private readonly IGenericRepository<StudentSubject> _studentSubjectRepo;
        private readonly IUnitOfWork _uow;

        public StudentService(IGenericRepository<Student> studentRepo, IGenericRepository<StudentSubject> studentSubjectRepo, IUnitOfWork uow)
        {
            _studentRepo = studentRepo;
            _studentSubjectRepo = studentSubjectRepo;
            _uow = uow;
        }

        public Student CreateStudent(Student model)
        {
            var id = Guid.NewGuid();

            model.Id = id;
            model.CreatedAt = DateTime.UtcNow;

            var createdStudent = _studentRepo.Insert(model);
            
            model.Subjects.ToList().ForEach(subject => subject.Student = createdStudent);
            _studentSubjectRepo.InsertRange(model.Subjects.ToList());
            _uow.SaveChanges();

            return createdStudent;
        }

        public Student GetStudent(Guid id)
        {
            var student = _studentRepo.FindById(id);
            return student;
        }

        public List<Student> GetStudents(DataTableAjaxPostModel model, out int filteredResultsCount, out int totalResultsCount)
        {
            var searchBy = (model.search != null) ? model.search.value : null;
            var take = model.length;
            var skip = model.start;

            string sortBy = "";
            bool sortDir = true;

            if (model.order != null)
            {
                // in this example we just default sort on the 1st column
                sortBy = model.columns[model.order[0].column].data;
                sortDir = model.order[0].dir.ToLower() == "desc";
            }
            if (sortBy == "")
            {
                sortBy = "CreatedAt";
            }

            var entities = _studentRepo.ToQueryable();

            entities = string.IsNullOrEmpty(searchBy)
                ? entities
                : entities.Where(a => a.Name.Contains(searchBy) || a.Name.Contains(searchBy) || a.NRIC.Contains(searchBy));

            totalResultsCount = entities.Count();

            var propertyinfo = typeof(Student).GetProperties().Where(t => t.Name.ToLower() == sortBy.ToLower()).FirstOrDefault();

            filteredResultsCount = entities.Count();

            if (propertyinfo != null)
            {
                entities = sortDir ? entities.AsEnumerable().OrderBy(i => propertyinfo.GetValue(i, null)).AsQueryable() : entities.AsEnumerable().OrderByDescending(i => propertyinfo.GetValue(i, null)).AsQueryable();
            }

            var students = entities.OrderByDescending(a => a.CreatedAt).Skip(skip).Take(take).ToList();
            students.ForEach(a => a.Subjects = _studentSubjectRepo.Where(b => b.StudentId == a.Id).ToList());

            return students;
        }

        public bool IsDuplicateNRIC(string nric)
        {
            var student = _studentRepo.Where(a => a.NRIC == nric).FirstOrDefault();
            return student != null;
        }

        public bool UpdateStudent(Student model)
        {
            var currentStudentSubjects = _studentSubjectRepo.Where(a => a.StudentId == model.Id).ToList();

            _studentSubjectRepo.DeleteRange(currentStudentSubjects);

            model.UpdatedDate = DateTime.UtcNow;
            var isUpdated = _studentRepo.Update(model);

            _studentSubjectRepo.InsertRange(model.Subjects.ToList());
            _uow.SaveChanges();

            return true;
        }
    }
}
