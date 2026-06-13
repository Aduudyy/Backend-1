using Backend_1.Models.Products;
using Backend_1.Service;
using System.Linq.Expressions;

namespace Backend_1.Models.Products
{
    public interface IProductService
    {
        Task<List<Product>> GetAllProduct();
        Task<Product?> GetProductById(int id);
        Task<ServiceReponse<bool>> AddProduct(Product product);
        Task<ServiceReponse<bool>> UpdateProduct(Product product);
        Task<ServiceReponse<bool>> DeleteProduct(int id);

        Task<IEnumerable<Product>> SearchProduct(Expression<Func<Product, bool>> predicate);
    }
}
