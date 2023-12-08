using Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Linq.Expressions;

namespace Repositories.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly ApplicationDBContext _dbContext;
        private IDbSet<T> _entities;

        public GenericRepository(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        private IDbSet<T> Entities => _entities ?? (_entities = _dbContext.Set<T>());

        public void DeleteRange(IList<T> entities)
        {
            try
            {
                foreach (var entity in entities)
                {
                    Entities.Remove(entity);
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Couldn't delete entities: {ex.Message}");
            }
        }

        public T FindById(Guid id)
        {
            try
            {
                return Entities.Find(id);
            }
            catch (Exception ex)
            {
                throw new Exception($"Couldn't find entity: {ex.Message}");
            }
        }

        public T Insert(T entity)
        {
            if (entity == null) throw new ArgumentNullException($"{nameof(entity)} entity must not be null");
            try
            {
                Entities.Add(entity);
                
                return entity;
            }
            catch (Exception ex)
            {
                throw new Exception($"{nameof(entity)} could not be insert: {ex.Message}");
            }
        }

        public void InsertRange(IList<T> entities)
        {
            try
            {
                foreach (var entity in entities)
                {
                    Entities.AddOrUpdate(entity);
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"List of {nameof(T)} could not be insert: {ex.Message}");
            }
            
        }

        public IQueryable<T> ToQueryable()
        {
            try
            {
                return Entities;
            }
            catch (Exception ex)
            {
                throw new Exception($"Couldn't retrieve entities: {ex.Message}");
            }
        }

        public bool Update(T entity)
        {
            if (entity == null) throw new ArgumentNullException($"{nameof(entity)} entity must not be null");
            try
            {
                Entities.AddOrUpdate(entity);
                
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"{nameof(entity)} could not be updated: {ex.Message}");
            }
        }

        public IQueryable<T> Where(Expression<Func<T, bool>> condition)
        {
            try
            {
                return Entities.Where(condition);
            }
            catch (Exception ex)
            {
                throw new Exception($"Couldn't retrieve entities: {ex.Message}");
            }
        }
    }
}
