using Repositories;
using System;

namespace StudentManagement.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDBContext _context;
        private bool _disposed;

        public UnitOfWork(ApplicationDBContext context)
        {
            _context = context;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            _disposed = true;
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
