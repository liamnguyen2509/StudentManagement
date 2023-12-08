using AutoMapper;
using Repositories;
using Repositories.Repositories;
using Serilog;
using Serilog.Sinks.MSSqlServer;
using StudentManagement.App.ViewModels;
using StudentManagement.Repositories;
using StudentManagement.Services;
using System;
using System.Configuration;
using System.Linq;
using Unity;
using Unity.Injection;
using Unity.Lifetime;

namespace StudentManagement
{
    public static class UnityConfig
    {
        #region Unity Container
        private static Lazy<IUnityContainer> container = new Lazy<IUnityContainer>(() =>
        {
            var container = new UnityContainer();
            RegisterTypes(container);

            return container;
        });

        public static IUnityContainer Container => container.Value;
        #endregion

        public static void RegisterTypes(IUnityContainer container)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString();
            container.RegisterType<ApplicationDBContext>(new PerResolveLifetimeManager())
                     .RegisterType<IUnitOfWork, UnitOfWork>(new PerResolveLifetimeManager())
                     .RegisterType(typeof(IGenericRepository<>), typeof(GenericRepository<>)).RegisterInstance(new PerResolveLifetimeManager());

            container.RegisterType<ILogger>(new ContainerControlledLifetimeManager(), new InjectionFactory((ctr, type, name) =>
            {
                ILogger log = new LoggerConfiguration()
                    .WriteTo.MSSqlServer(
                        connectionString: connectionString,
                        sinkOptions: new MSSqlServerSinkOptions
                        {
                            TableName = "EventLogs",
                            AutoCreateSqlTable = true,
                        }
                    ) //Your serilog config here
                    .CreateLogger();

                return log;
            }));

            container.RegisterInstance<IMapper>(new AutoMapperConfiguration().RegisterAutoMapper());

            var assembly = typeof(StudentService).Assembly;
            var registrations =
                assembly.GetTypes()
                    .Where(x => x.Name.EndsWith("Service") && !x.IsInterface && !x.IsAbstract)
                    .Select(x => new { Interface = x.GetInterfaces().FirstOrDefault(), Implementation = x })
                    .Where(x => x.Interface != null && x.Implementation != null)
                    .ToArray();
            foreach (var registration in registrations)
            {
                container.RegisterType(registration.Interface, registration.Implementation).RegisterInstance(new PerResolveLifetimeManager());
            }
        }
    }
}