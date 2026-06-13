using Backend_1.Models.AddressModel;
using Backend_1.Models.Products;
using Backend_1.Service;
using Backend_1.Service.Suppliers;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Backend_1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupplierController : ControllerBase
    {
        private readonly AddressService _address;
        private readonly SupplierService _supplierService;
        public SupplierController(SupplierService supplierService, AddressService address)
        {
            _supplierService = supplierService;
            _address = address;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Supplier>>> GetAllSupplier()
        {
            var result = await _supplierService.GetAllSuppliers();
            if (result == null)
            {
                return NotFound("Không có nhà cung cấp nào");
            }
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Supplier>> GetIdSupplier(int id)
        {
            var result = await _supplierService.GetSupplierById(id);
            if(result == null)
            {
                return NotFound("Không có nhà cung cấp");
            }
            return Ok(result);
        }
        [HttpGet("province")]
        public async Task<ActionResult<IEnumerable<Province>>> GetAllProvice()
        {
            var result = await _address.GetAllProvince();
            return Ok(result);
        }
        [HttpGet("ward/{provinceId}")]
        public async Task<ActionResult<IEnumerable<Ward>>> GetAllWard(int provinceId)
        {
            var result = await _address.GetWardByDistrict(provinceId);
            if (result == null)
            {
                return NotFound("Không có dữ liệu");
            }
            return Ok(result);
        }

        [HttpGet("searchProvince/{provinceId}")]
        public async Task<IActionResult> GetProvince(int provinceId)
        {
            var province = await _address.SearchProvince(provinceId);
            if(province == null)
            {
                return NotFound("Không có nhà cung cấp");
            }
            return Ok(province);
        }


        [HttpPost("add")]
        public async Task<IActionResult> AddProduct([FromBody] Supplier supplier)
        {
            try
            {
                var result = await _supplierService.AddSupplier(supplier);
                return Ok(result);
            }
            catch (ValidationException ex) 
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                // Log lỗi tại đây (dùng ILogger)
                return StatusCode(500, "Đã có lỗi xảy ra trong quá trình xử lý.");
            }
        }
    }
}
