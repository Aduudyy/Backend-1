using Backend_1.Models.Client;
using Backend_1.Models.Products;
using Backend_1.Service.Customer;
using Backend_1.Service.Products;
using Microsoft.AspNetCore.Mvc;

namespace Backend_1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerService _customerService;
        public CustomerController(CustomerService customerService)
        {
            _customerService = customerService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetProducts()
        {
            var result = await _customerService.GetAllCustomer();
            if (result == null)
            {
                return NotFound("Không thể tải danh sách sản phẩm ");
            }
            return Ok(result);
        }
        [HttpPost("add")]
        public async Task<IActionResult> AddProduct([FromBody] Client client)
        {
            try
            {
                var result = await _customerService.AddCustomer(client);

                return Ok(new
                {
                    message = "Thêm khách hàng thành công",
                    data = result
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("update-debts/{id}")]
        public async Task<IActionResult> UpdateDebts(int id, [FromBody] int newDebts)
        {
            try
            {
                // Gọi sang service để xử lý cập nhật công nợ
                var result = await _customerService.UpdateCustomerDebts(id, newDebts);

                if (!result)
                {
                    return NotFound(new { message = "Không tìm thấy khách hàng để cập nhật công nợ" });
                }

                return Ok(new
                {
                    message = "Cập nhật công nợ khách hàng thành công",
                    debts = newDebts
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

    }
}
