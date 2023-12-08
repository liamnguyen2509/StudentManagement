using Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Repositories.Repositories
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        IQueryable<T> ToQueryable();
        IQueryable<T> Where(Expression<Func<T, bool>> condition);
        T FindById(Guid id);
        T Insert(T entity);
        void InsertRange(IList<T> entities);
        bool Update(T entity);
        void DeleteRange(IList<T> entities);
    }
}
