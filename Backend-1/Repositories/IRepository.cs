using System.Linq.Expressions;

namespace Backend_1.Repositories
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T?> GetByIdAsync(int id);
        Task AddAsync(T entity);
        Task Delete(T entity);
        Task Update(T entity);
         IEnumerable<T> Find (Expression<Func<T, bool>> predicate);
        Task<bool> Any(Expression<Func<T, bool>> predicate);
        
    }
}
