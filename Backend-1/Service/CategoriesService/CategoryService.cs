using Backend_1.Data;
using Backend_1.Models.Products;
using Microsoft.EntityFrameworkCore;

namespace Backend_1.Service.CategoriesService
{
    public class CategoryService
    {
        private readonly AppDBContext _context;

        public CategoryService(AppDBContext context)
        {
            _context = context;
        }

        public async Task<List<Category>> GetAllAsync()
        {
            return await _context.Categories
                .Include(x => x.Parent)
                .Include(x => x.Children)
                .ToListAsync();
        }

        public async Task<Category?> GetByIdAsync(int id)
        {
            return await _context.Categories
                .Include(x => x.Parent)
                .Include(x => x.Children)
                .FirstOrDefaultAsync(x => x.categoryId == id);
        }

        public async Task<Category> CreateAsync(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<bool> UpdateAsync(int id, Category category)
        {
            var existing = await _context.Categories.FindAsync(id);

            if (existing == null)
                return false;

            existing.categoryname = category.categoryname;
            existing.IsActive = category.IsActive;
            existing.ParentId = category.ParentId;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
                return false;

            _context.Categories.Remove(category);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
