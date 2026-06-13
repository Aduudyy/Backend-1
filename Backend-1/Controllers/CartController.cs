using Backend_1.Data;
using Backend_1.Models.Carts;
using Backend_1.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Backend_1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly IRepository<Cart> _base;
        private readonly IRepository<CartItems> _cartBase;
        private readonly AppDBContext _context;
        public CartController(IRepository<Cart> @base, IRepository<CartItems> cartBase, AppDBContext context)
        {
            _base = @base;
            _cartBase = cartBase;
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var carts =  await _context.Carts
                                       .Include(x => x.CartItems!)
                                       .ThenInclude(x => x.Product)
                                       .ToListAsync();
            return Ok(carts);
        }
        [HttpGet("get-cartItem")]
        public async Task<IActionResult> GetCartItem()
        {
            var cartItem = await _cartBase.GetAllAsync();
            return Ok(cartItem);
        }

        [HttpPost("add-cart")]
        [Authorize]
        public async Task<IActionResult> AddToCart([FromBody] CartItems item)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized();
            int userId = int.Parse(userIdClaim.Value);
            var product = await _context.Products
                .FirstOrDefaultAsync(x => x.ProductId == item.ProductId);
            if (product == null)
                return BadRequest("Sản phẩm không tồn tại");
            var cart = await _context.Carts
                .Include(x => x.CartItems)
                .FirstOrDefaultAsync(x => x.UserId == userId);
            if (cart == null)
            {
                cart = new Cart
                {
                    UserId = userId,
                    CartItems = new List<CartItems>()
                };
                await _base.AddAsync(cart); 
            }
            var existingItem = cart.CartItems?.FirstOrDefault(x => x.ProductId == item.ProductId);
            if (existingItem != null)
            {
                existingItem.Quantity += 1;
                await _context.SaveChangesAsync();
            }
            else
            {
                var newItem = new CartItems
                {
                    CartId = cart.CartId,       
                    ProductId = item.ProductId, 
                    Quantity = 1                
                };
                await _cartBase.AddAsync(newItem);
            }

            return Ok(new { message = "Cập nhật giỏ hàng thành công!" });
        }
        [HttpDelete("delete-cart-item/{productId}")]
        [Authorize]
        public async Task<IActionResult> DeleteCartItem(int productId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var cart = await _context.Carts
                .Include(x => x.CartItems)
                .FirstOrDefaultAsync(x => x.UserId == userId);

            if (cart == null)
                return NotFound("Không tìm thấy giỏ hàng");

            var item = cart.CartItems!
                    .FirstOrDefault(x => x.ProductId == productId);

            if (item == null)
                return NotFound("Sản phẩm không tồn tại trong giỏ hàng");

            await _cartBase.Delete(item);
            return Ok(new
            {
                message = "Xóa sản phẩm khỏi giỏ hàng thành công"
            });
        }

    }
}
