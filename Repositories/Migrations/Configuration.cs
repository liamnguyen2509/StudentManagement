using global::Repositories;
using Repositories.Entities;
using System.Data.Entity.Migrations;

namespace StudentManagement.Repositories.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<ApplicationDBContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "Repositories.ApplicationDBContext";
        }

        protected override void Seed(ApplicationDBContext context)
        {
            context.Set<Subject>().AddOrUpdate(
                new Subject() { Id = System.Guid.NewGuid(), Name = "English", CreatedAt = System.DateTime.UtcNow },
                new Subject() { Id = System.Guid.NewGuid(), Name = "Math", CreatedAt = System.DateTime.UtcNow },
                new Subject() { Id = System.Guid.NewGuid(), Name = "Science", CreatedAt = System.DateTime.UtcNow }
                );
        }
    }
}
