using Azure;
using Backend_1.Data;
using Backend_1.Models.AddressModel;
using Backend_1.Models.Products;
using Backend_1.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Backend_1.Service.Products
{
    public class ProductService : IProductService
    {
        private readonly IRepository<Product> _baserepository;
        private readonly AppDBContext _context;
        public ProductService(IRepository<Product> baserepository,AppDBContext context)
        {
            _baserepository = baserepository;
            _context = context;
        }
        //Task<IEnumerable<Product>> GetAllProduct();
        public async Task<List<Product>> GetAllProduct()
        {
            return await _context.Products
                .Include(x => x.Unit).ToListAsync();
        }
        //Task<Product?> GetProductById(int id);
        public async Task<Product?> GetProductById(int id)
        {
            return await _baserepository.GetByIdAsync(id);
        }

        //Task<bool> AddProduct(Product product);
        public async Task<ServiceReponse<bool>> AddProduct(Product product)
        {
            var reponse =new  ServiceReponse<bool>();
            if(product == null || string.IsNullOrEmpty(product.ProductName))
            {
                reponse.Success = false;
                reponse.Message = "Thông tin sản phẩm không được trống";
                return reponse;   
            }
            var result = await _baserepository.Any(p=> p.ProductName!.ToLower() == product.ProductName.ToLower());
           if(result)
            {
                reponse.Success = false;
                reponse.Message = "sản phẩm đã tồn tại";
                return reponse;
            }
            try
            {
                await _baserepository.AddAsync(product);               
                reponse.Success = true;
                reponse.Message = "Thêm sản phẩm mới thành công";
                return reponse;

            }
            catch (Exception ex)
            {
                reponse.Success = false;
                reponse.Message= ex.Message;
                return reponse;

            }
        }

        //Task<bool> UpdateProduct(Product product);

        public async Task<ServiceReponse<bool>> UpdateProduct(Product product)
        {
            var reponse = new ServiceReponse<bool>();
            try
            {
                await _baserepository.Update(product);
                reponse.Success= true;
                reponse.Message = " Cập nhật sản phẩm thành công";
                return reponse;
            }
            catch
            {
                reponse.Success = false;
                reponse.Message = " Cập nhật sản phẩm thất bại";
                return reponse;
            }
        }
        //Task<bool> DeleteProduct(int id);
        public async Task<ServiceReponse<bool>> DeleteProduct(int id)
        {
            var reponse = new ServiceReponse<bool>();
            var product = await _baserepository.GetByIdAsync(id);
            if( product == null)
            {
                reponse.Success = false;
                reponse.Message = " Sản phẩm không tồn tại";
                return reponse;
            }
            try
            {
                await _baserepository.Delete(product);
                reponse.Success = true;
                reponse.Message = " Xoá sản phẩm thành công sản phẩm thành công";
                return reponse;
            }
            catch
            {
                reponse.Success = false;
                reponse.Message = " Xoá sản phẩm thất bại";
                return reponse;
            }

        }

        //Task<IEnumerable<Product>> SearchProduct(Expression<Func<Product, bool>> predicate);
        public async Task<IEnumerable<Product>> SearchProduct(Expression<Func<Product,bool>> predicate)
        {
            return _baserepository.Find(predicate);
        }
        public async Task<IEnumerable<Unit>> GetAllUnit()
        {
            return await _context.Units.ToListAsync();
        }
        public async Task<List<Product>> RecommendProducts(
    int productId,
    string? name,
    int? supplierId)
        {

            var bestSeller = await _context.Orders
                .Where(o => o.Status == "Completed")
                .SelectMany(o => o.orderItems!)
                .GroupBy(oi => oi.ProductId)
                .Select(g => new
                {
                    ProductId = g.Key,
                    TotalSold = g.Sum(x => x.Quantity)
                })
                .ToListAsync();
            var products = await _context.Products
                .Where(p => p.ProductId != productId)
                .ToListAsync();
            var result = products
                .Select(p =>
                {
                    var sold = bestSeller
                        .FirstOrDefault(x => x.ProductId == p.ProductId)
                        ?.TotalSold ?? 0;

                    int score = 0;

                    // cùng nhà cung cấp
                    if (supplierId.HasValue && p.SupplierId == supplierId)
                        score += 5;

                    // giống tên
                    if (!string.IsNullOrWhiteSpace(name) &&
                        p.ProductName != null &&
                        p.ProductName.Contains(name))
                        score += 3;

                    // bán chạy
                    if (sold > 0)
                        score += 2;

                    return new
                    {
                        Product = p,
                        Score = score
                    };
                })
                .OrderByDescending(x => x.Score)
                .ThenByDescending(x => x.Product.ProductId)
                .Take(3)
                .Select(x => x.Product)
                .ToList();
            return result;
        }
    }
}
