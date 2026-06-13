using Backend_1.Data;
using Backend_1.DTOs.Order_dto;
using Backend_1.Models.Carts;
using Backend_1.Models.Oders;
using Backend_1.Repositories;
using Backend_1.Service.Products;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend_1.Service.Orders
{
    public class OrderService : ControllerBase
    {
        public readonly IRepository<Order> _repository;
        public readonly IRepository<OrderItem> _itemRepository;
        public readonly IRepository<CartItems> _cartRepository;
        private readonly AppDBContext _context;
        private readonly ProductService _productService;

        public OrderService(IRepository<Order> repository, AppDBContext context, IRepository<OrderItem> itemRepository, IRepository<CartItems> cartRepository, ProductService productService)
        {
            _repository = repository;
            _context = context;
            _itemRepository = itemRepository;
            _cartRepository = cartRepository;
            _productService = productService;
           
        }
        public async Task<List<Order>> GetAllOrders()
        {
            return await _context.Orders
                .Include(o => o.orderItems!)
                .ThenInclude(od => od.product)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();
        }
        public async Task<Order> CreateOrder(int userId, OrderDTO dto)
        {

            decimal totalPrice = 0;

            var order = new Order
            {
                UserId =userId,
                Province = dto.Province,
                Ward = dto.Ward,
                Note = dto.Note,
                OrderDate = DateTime.Now,
                Status = "Pending"
            };

            await _repository.AddAsync(order);
            // Lấy giỏ hàng của user
            var cart = _context.Carts
                .Include(x => x.CartItems)
                .FirstOrDefault(x => x.UserId == dto.UserId);

            foreach (var item in dto.Products)
            {
                var product = await _context.Products
                    .FirstOrDefaultAsync(x => x.ProductId == item.ProductId);

                if (product == null)
                    throw new Exception($"Không tìm thấy sản phẩm {item.ProductId}");

                if (product.Quantity < item.Quantity)
                    throw new Exception($"{product.ProductName} không đủ tồn kho");

                totalPrice += product.SellPrice * item.Quantity;

                var orderItem = new OrderItem
                {
                    OrderId = order.OrderId,
                    ProductId = product.ProductId,
                    Quantity = item.Quantity,
                    Price = product.SellPrice
                };

                await _itemRepository.AddAsync(orderItem);

                // Trừ kho luôn
                product.Quantity -= item.Quantity;
                var cartItem = cart!.CartItems!
                        .FirstOrDefault(x => x.ProductId == item.ProductId);

                if (cartItem != null)
                {
                    await _cartRepository.Delete(cartItem);
                }

            }

            order.TotalPrice = totalPrice;

            await _context.SaveChangesAsync();

            return order;
        }
        public async Task<bool> UpdateStatus(int invoiceId, string status)
        {
            var invoice = await _context.Orders
                .FirstOrDefaultAsync(x => x.OrderId == invoiceId);

            if (invoice == null)
                return false;

            // validate trạng thái
            var validStatus = new[] { "Pending", "Completed", "Cancelled" };

            if (!validStatus.Contains(status))
                throw new ArgumentException("Status không hợp lệ.");
            if (status == "Cancelled" && invoice.Status != "Cancelled")
            {
                foreach (var detail in invoice.orderItems ?? Enumerable.Empty<OrderItem>())

                {
                    var product = await _context.Products
                        .FirstOrDefaultAsync(x => x.ProductId == detail.ProductId);

                    if (product != null)
                    {
                        product.Quantity += detail.Quantity;
                        await _productService.UpdateProduct(product);
                    }
                }
            }

            invoice.Status = status;

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
