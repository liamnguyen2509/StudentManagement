using Repositories.Entities;
using System;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Reflection;

namespace Repositories
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext() : base("DefaultConnection")
        {

        }

        public new DbSet<T> Set<T>() where T : BaseEntity
        {
            return base.Set<T>();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            var typeToRegister = Assembly.GetExecutingAssembly().GetTypes()
                .Where(type => !String.IsNullOrEmpty(type.Namespace))
                .Where(
                    type =>
                        type.BaseType != null && type.BaseType.IsGenericType &&
                        type.BaseType.GetGenericTypeDefinition() == typeof(EntityTypeConfiguration<>));
            foreach (var type in typeToRegister)
            {
                dynamic configurationInstance = Activator.CreateInstance(type);
                modelBuilder.Configurations.Add(configurationInstance);
            }
            base.OnModelCreating(modelBuilder);
        }
    }
}
