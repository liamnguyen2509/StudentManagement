using AutoMapper;
using Repositories.Entities;
using Serilog;
using StudentManagement.App.ViewModels;
using StudentManagement.Services.Common;
using StudentManagement.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace StudentManagement.App.Controllers
{
    public class HomeController : Controller
    {
        private readonly IStudentService _studentService;
        private readonly ISubjectService _subjectService;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public HomeController(IStudentService studentService, ISubjectService subjectService, IMapper mapper, ILogger logger)
        {
            _studentService = studentService;
            _subjectService = subjectService;
            _mapper = mapper;
            _logger = logger;
        }

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetStudents(DataTableAjaxPostModel model)
        {
            try
            {
                _logger.Information("Get Student List");
                var studentEntities = _studentService.GetStudents(model, out int filteredResultsCount, out int totalResultsCount);
                var students = _mapper.Map<List<StudentIndexVM>>(studentEntities);

                var count = 1;
                foreach (var student in students)
                {
                    student.SN = model.start + count;
                    count++;
                }

                return Json(new
                {
                    draw = model.draw,
                    recordsTotal = totalResultsCount,
                    recordsFiltered = filteredResultsCount,
                    data = students
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult Register(StudentRegisterVM model)
        {
            try
            {
                var modelErrors = new List<string>();
                _logger.Information("[Register] Check ModelState is valid");
                if (!ModelState.IsValid)
                {
                    foreach (var modelState in ModelState.Values)
                    {
                        foreach (var modelError in modelState.Errors)
                        {
                            modelErrors.Add(modelError.ErrorMessage);
                        }
                    }

                    return Json(new
                    {
                        status = false,
                        message = modelErrors
                    });
                }

                _logger.Information("[Register] Check Duplicate NRIC");
                var isDuplicateNric = _studentService.IsDuplicateNRIC(model.NRIC);
                if (isDuplicateNric)
                {
                    modelErrors.Add($"The NRIC {model.NRIC} was duplicated");
                    return Json(new
                    {
                        status = false,
                        message = modelErrors
                    });
                }

                var student = _mapper.Map<Student>(model);
                student.Subjects = model.SubjectIds != null && model.SubjectIds.Any() ? model.SubjectIds.Select(m => new StudentSubject
                {
                    Id = Guid.NewGuid(),
                    SubjectId = m,
                    CreatedAt = DateTime.UtcNow
                }).ToList() : new List<StudentSubject>();

                _logger.Information("[Register] Create Student");
                _studentService.CreateStudent(student);
                return Json(new
                {
                    status = true,
                    message = modelErrors
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _logger.Error("[Register] Create new Student failed", ex.Message);
                return null;
            }
        }

        public JsonResult GetSubjects()
        {
            var subjects = _subjectService.GetSubjects();
            var result = subjects.Select(a => new
            {
                id = a.Id,
                text = a.Name
            }).ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Update(Guid id)
        {
            var studentEntity = _studentService.GetStudent(id);
            var subjectEntities = _subjectService.GetSubjectsByStudent(id).AsEnumerable();

            var student = _mapper.Map<StudentUpdateVM>(studentEntity);
            student.Subjects = _mapper.Map<List<SubjectVM>>(subjectEntities);

            return View(student);
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult Update(StudentUpdateVM model)
        {
            try
            {
                var modelErrors = new List<string>();
                _logger.Information("[Update] Check ModelState is valid");
                if (!ModelState.IsValid)
                {
                    foreach (var modelState in ModelState.Values)
                    {
                        foreach (var modelError in modelState.Errors)
                        {
                            modelErrors.Add(modelError.ErrorMessage);
                        }
                    }

                    return Json(new
                    {
                        status = false,
                        message = modelErrors
                    });
                }

                _logger.Information("[Update] Get current student in database");
                var currentStudent = _studentService.GetStudent(model.StudentId);

                _mapper.Map<StudentUpdateVM, Student>(model, currentStudent);
                currentStudent.Subjects = model.SubjectIds != null && model.SubjectIds.Any() ? model.SubjectIds.Select(m => new StudentSubject
                {
                    Id = Guid.NewGuid(),
                    StudentId = currentStudent.Id,
                    SubjectId = m,
                    CreatedAt = DateTime.UtcNow
                }).ToList() : new List<StudentSubject>();

                _logger.Information("[Update] Update Student information");
                _studentService.UpdateStudent(currentStudent);
                return Json(new
                {
                    status = true,
                    message = modelErrors
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _logger.Error("[Register] Create new Student failed", ex.Message);
                return null;
            }
        }
    }
}