using System;

namespace Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        void SaveChanges();
    }
}
