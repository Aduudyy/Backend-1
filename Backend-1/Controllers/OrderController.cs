using Backend_1.DTOs.Order_dto;
using Backend_1.Service.Export;
using Backend_1.Service.Orders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static Backend_1.DTOs.InvoiceDTO;

namespace Backend_1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;
       

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var orders = await _orderService.GetAllOrders();

            return Ok(orders);
        }
        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> CreateOrder(
            [FromBody] OrderDTO dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);
            try
            {
                dto.UserId = userId;
                var order = await _orderService.CreateOrder(userId , dto);

                return Ok(new
                {
                    success = true,
                    message = "Đặt hàng thành công",
                    orderId = order.OrderId
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.InnerException?.Message ?? ex.Message,
                    detail = ex.ToString()
                });
            }
        }
        [HttpPut("update-status/{id}")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateInvoiceStatusDto dto)
        {
            try
            {
                var result = await _orderService.UpdateStatus(id, dto.Status);

                if (!result)
                    return NotFound("Invoice không tồn tại");

                return Ok("Cập nhật trạng thái thành công");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
