using Backend_1.DTOs.Product;
using Backend_1.Models.Products;
using Backend_1.Service;
using Backend_1.Service.CategoriesService;
using Backend_1.Service.Products;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Backend_1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;
        private readonly CategoryService _categoryService;

        public ProductController(ProductService productService, CategoryService categoryService )
        {
            _productService = productService;
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var result = await _productService.GetAllProduct();
            if (result == null)
            {
                return NotFound("Không thể tải danh sách sản phẩm ");
            }
            return Ok(result);
        }
        [HttpGet("unit")]
        
        public async Task<ActionResult<IEnumerable<Unit>>> GetAllUnit()
        {
            var result = await _productService.GetAllUnit();
            if (result == null)
            {
                return NotFound("Không thể tải danh sách đơn vị sản phẩm ");
            }
            return Ok(result);
        }
        [HttpGet("category")]
        public async Task<ActionResult<IEnumerable<Unit>>> GetAllCategory()
        {
            var result = await _categoryService.GetAllAsync();
            if (result == null)
            {
                return NotFound("Không thể tải danh sách loại sản phẩm ");
            }
            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var result = await _productService.GetProductById(id);
            if (result == null)
            {
                return NotFound("Không tìm thấy sản phẩm ");
            }
            return Ok(result);

        }
        [HttpPost("add")]
        public async Task<IActionResult> AddProduct([FromForm] ProductCreateDto dto)
        {
            try
            {
                string imageUrl = ""; 
                if (dto.ImageFile != null && dto.ImageFile.Length > 0)
                {
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.ImageFile.FileName);
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "products");
                    if (!Directory.Exists(folderPath))
                    {
                        Directory.CreateDirectory(folderPath);
                    }
                    var filePath = Path.Combine(folderPath, fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await dto.ImageFile.CopyToAsync(stream);
                    }
                    imageUrl = "/uploads/products/" + fileName;
                }
                var product = new Product
                {
                    ProductName = dto.ProductName,
                    SellPrice = dto.SellPrice,
                    ImportPrice = dto.ImportPrice,
                    Quantity = dto.Quantity,
                    SupplierId = dto.SupplierId,
                    ProductionDate = dto.ProductionDate,
                    UnitId = dto.UnitId,
                    Expery = dto.Expery,
                    ImageUrl = imageUrl,
                    IsActive = dto.IsActive,
                   
                };
                await _productService.AddProduct(product);

                return Ok(new { message = "Thêm sản phẩm thành công", path = imageUrl });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Lỗi xử lý", detail = ex.Message });
            }
        }
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Product>>> SearchProduct([FromQuery] string? name,[FromQuery] int? supplierId)
            {
                try
                {
                    name = name?.Trim().ToLower();

                    var result = await _productService.SearchProduct(p =>
                        (string.IsNullOrWhiteSpace(name) ||
                         (p.ProductName != null &&
                          p.ProductName.ToLower().Contains(name)))
                        &&
                        (!supplierId.HasValue ||
                         p.SupplierId == supplierId.Value)
                    );

                    if (!result.Any())
                    {
                        return NotFound("Không tìm thấy sản phẩm");
                    }

                    return Ok(result);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, "Lỗi hệ thống: " + ex.Message);
                }
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                var result = await _productService.GetProductById(id);
                if (result == null)
                {
                    return NotFound("Sản phẩm không tồn tại");
                }
                if (!string.IsNullOrEmpty(result.ImageUrl))
                {
                    var imagePath = Path.Combine(Directory.GetCurrentDirectory(),"wwwroot",result.ImageUrl.TrimStart('/'));

                    if (System.IO.File.Exists(imagePath))
                    {
                        System.IO.File.Delete(imagePath);
                    }
                }
                await _productService.DeleteProduct(id);
                return Ok(new { message = " Xoá sản phẩm thành công" } );
                    
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi hệ thống " + ex.Message);
            }
        }
        [HttpPut("update/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProduct(int id, [FromForm] ProductUpdateDto dto)
        {
            var product = await _productService.GetProductById(id);
            if (product == null) return NotFound();
            product.ProductName = dto.ProductName;
            product.SellPrice = dto.SellPrice;
            product.ImportPrice = dto.ImportPrice;
            product.Quantity = dto.Quantity;
            product.SupplierId = dto.SupplierId;
            product.ProductionDate = dto.ProductionDate;
            product.Expery = dto.Expery;
            product.IsActive = dto.IsActive;
            product.UnitId = dto.UnitId;
            if (dto.ImageFile != null && dto.ImageFile.Length > 0)
            {
                if (!string.IsNullOrEmpty(product.ImageUrl))
                {
                    var oldPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", product.ImageUrl.TrimStart('/'));
                    if (System.IO.File.Exists(oldPath)) System.IO.File.Delete(oldPath);
                }
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.ImageFile.FileName);
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads/products", fileName);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await dto.ImageFile.CopyToAsync(stream);
                }
                product.ImageUrl = "/uploads/products/" + fileName;
            }
            else if (!string.IsNullOrEmpty(dto.ImageUrl))
            {
                product.ImageUrl = dto.ImageUrl;
            }
            await _productService.UpdateProduct(product);
            return Ok(new { message = "Cập nhật thành công", imageUrl = product.ImageUrl });
        }
        [HttpGet("searchSupplier/{supplierId}")]
        public async Task<ActionResult<IEnumerable<Product>>> SearchSupplier(int supplierId)
        {
            try
            {
                var result = await _productService.SearchProduct(p => p.SupplierId == supplierId);
                if (!result.Any())
                {
                    return NotFound($" Không tìm thấy nhà cung cấp với ID :  {supplierId} " );
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi hệ thống " + ex.Message);
            }

        }
        [HttpPost("import-stock")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ImportStock([FromBody] List<Product> items)
        {
            if (items == null || !items.Any())
                return BadRequest("Danh sách sản phẩm nhập trống.");
            foreach (var item in items)
            {
                var product = await _productService.GetProductById(item.ProductId);
                if (product != null)
                {
                    product.Quantity += item.Quantity;
                    await _productService.UpdateProduct(product);
                }
            }

            return Ok(new { message = "Đã nhập hàng và cộng dồn số lượng vào kho thành công!" });
        }
        [HttpPost("export-stock")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ExportStock([FromBody] List<Product> items)
        {
            if (items == null || !items.Any())
                return BadRequest("Danh sách sản phẩm nhập trống.");
            foreach (var item in items)
            {
                var product = await _productService.GetProductById(item.ProductId);
                if (product != null)
                {
                    product.Quantity -= item.Quantity;
                    await _productService.UpdateProduct(product);
                }
            }

            return Ok(new { message = "Đã nhập hàng và cộng dồn số lượng vào kho thành công!" });
        }
        [HttpGet("recommend")]
        public async Task<ActionResult<IEnumerable<Product>>> Recommend(
            [FromQuery] int productId,
            [FromQuery] string? name,
            [FromQuery] int? supplierId)
        {
            try
            {
                var result = await _productService.RecommendProducts(productId, name, supplierId);

                if (!result.Any())
                    return NotFound("Không có sản phẩm gợi ý");

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi hệ thống: " + ex.Message);
            }
        }
    }

}
