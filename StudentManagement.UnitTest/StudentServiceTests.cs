using AutoFixture;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Repositories;
using Repositories.Entities;
using Repositories.Repositories;
using StudentManagement.Services;
using StudentManagement.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace StudentManagement.UnitTest
{
    [TestClass]
    public class StudentServiceTests
    {
        private readonly Mock<IGenericRepository<Student>> _mockStudentRepo;
        private readonly Mock<IGenericRepository<StudentSubject>> _mockStudentSubjectRepo;
        private readonly Mock<IUnitOfWork> _mockUow;
        private readonly IStudentService _studentService;

        public StudentServiceTests()
        {
            _mockStudentRepo = new Mock<IGenericRepository<Student>>();
            _mockStudentSubjectRepo = new Mock<IGenericRepository<StudentSubject>>();
            _mockUow = new Mock<IUnitOfWork>();
            _studentService = new StudentService(_mockStudentRepo.Object, _mockStudentSubjectRepo.Object, _mockUow.Object);
        }

        [TestMethod]
        public void CheckDuplicateNRIC_AlreadyExist_ReturnTrue()
        {
            // Arrange
            Fixture fixture = new Fixture();
            fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList().ForEach(b => fixture.Behaviors.Remove(b));
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());

            var NRIC = "S123456A";
            var students = fixture.CreateMany<Student>(2);
            var queryableStudents = students.AsQueryable();
            _mockStudentRepo.Setup(a => a.Where(It.IsAny<Expression<Func<Student, bool>>>())).Returns(queryableStudents);

            // Action
            var result = _studentService.IsDuplicateNRIC(NRIC);

            // Assert
            Assert.IsTrue(result);
        }

        [TestMethod]
        public void CheckDuplicateNRIC_NotExist_ReturnFasle()
        {
            // Arrange
            Fixture fixture = new Fixture();
            fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList().ForEach(b => fixture.Behaviors.Remove(b));
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());

            var NRIC = "S123456A";
            var students = new List<Student>();
            var queryableStudents = students.AsQueryable();
            _mockStudentRepo.Setup(a => a.Where(It.IsAny<Expression<Func<Student, bool>>>())).Returns(queryableStudents);

            // Action
            var result = _studentService.IsDuplicateNRIC(NRIC);

            // Assert
            Assert.IsFalse(result);
        }

        [TestMethod]
        public void CreateStudent_Valid_Success()
        {
            // Arrange
            Fixture fixture = new Fixture();
            fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList().ForEach(b => fixture.Behaviors.Remove(b));
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());

            var student = new Student();
            student.Subjects = fixture.CreateMany<StudentSubject>(2);

            _mockStudentRepo.Setup(a => a.Insert(It.IsAny<Student>())).Returns(student);
            _mockStudentSubjectRepo.Setup(a => a.InsertRange(It.IsAny<List<StudentSubject>>()));
            // Action
            var result = _studentService.CreateStudent(student);

            // Assert
            Assert.IsNotNull(result);
        }
    }
}
