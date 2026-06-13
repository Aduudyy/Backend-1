using Backend_1.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Backend_1.Repositories
{
    public class Baserepository<T> : IRepository<T> where T : class
    {
        protected readonly AppDBContext _dbContext;
        protected readonly DbSet<T> _dbSet;
        public Baserepository(AppDBContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet =_dbContext.Set<T>();
        }
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }
        public async Task<T?> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }  
        public async Task AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
        }
        public async Task Update(T entity) 
        {
            _dbSet.Update(entity);
            await _dbContext.SaveChangesAsync();
        } 
        public async Task Delete(T entity)
        {
            _dbContext.Remove(entity);
            await _dbContext.SaveChangesAsync();
        }
        public IEnumerable<T> Find(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.Where(predicate).ToList();
        }  
        public async Task<bool> Any(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.AnyAsync(predicate);
        }

    }
}
