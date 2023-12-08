using AutoMapper;
using Repositories.Entities;
using StudentManagement.App.Helpers;
using System.Linq;

namespace StudentManagement.App.ViewModels
{
    public class AutoMapperConfiguration
    {
        public IMapper RegisterAutoMapper()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<StudentProfile>();
                cfg.AddProfile<SubjectProfile>();
            });
            return config.CreateMapper();
        }
    }

    public class StudentProfile : Profile
    {
        public StudentProfile()
        {
            CreateMap<Student, StudentIndexVM>()
                    .ForMember(dest => dest.SN, opt => opt.Ignore())
                    .ForMember(dest => dest.StudentId, opt => opt.MapFrom(src => src.Id))
                    .ForMember(dest => dest.StudentName, opt => opt.MapFrom(src => src.Name))
                    .ForMember(dest => dest.TotalSubject, opt => opt.MapFrom(src => src.Subjects.Count()))
                    .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.Birthday.GetAge()));

            CreateMap<StudentRegisterVM, Student>()
                    .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.StudentName))
                    .ForMember(dest => dest.Birthday, opt => opt.MapFrom(src => src.DOB));

            CreateMap<Student, StudentUpdateVM>()
                    .ForMember(dest => dest.StudentId, opt => opt.MapFrom(src => src.Id))
                    .ForMember(dest => dest.StudentName, opt => opt.MapFrom(src => src.Name))
                    .ForMember(dest => dest.DOB, opt => opt.MapFrom(src => src.Birthday));

            CreateMap<StudentUpdateVM, Student>()
                    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.StudentId))
                    .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.StudentName))
                    .ForMember(dest => dest.Birthday, opt => opt.MapFrom(src => src.DOB))
                    .ForMember(dest => dest.CreatedAt, opt => opt.Ignore());
        }
    }

    public class SubjectProfile : Profile
    {
        public SubjectProfile()
        {
            CreateMap<Subject, SubjectVM>()
                .ForMember(dest => dest.SubjectId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.SubjectName, opt => opt.MapFrom(src => src.Name));
        }
    }
}