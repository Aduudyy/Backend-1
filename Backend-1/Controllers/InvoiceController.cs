using Backend_1.DTOs;
using Backend_1.Models.Invoice;
using Backend_1.Service.Export;
using Backend_1.Service.RepostService;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using static Backend_1.DTOs.InvoiceDTO;

namespace Backend_1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvoiceController : ControllerBase
    {
        private readonly InvoiceService _invoiceService;
        private readonly RepostService _repostService;
        public InvoiceController(InvoiceService invoiceService, RepostService repostService)
        {
            _invoiceService = invoiceService;
            _repostService = repostService;
        }

        [HttpGet]
        public async Task<IEnumerable<Invoice>> GetAllInvoice()
        {
            return await _invoiceService.GetAll();

        }

        [HttpPost("add-invoice")]
        public async Task<IActionResult> addInvoice([FromBody] InvoiceDTO.InvoiceCreateDto invoiceDetail)
        {
            try
            {
                var result = await _invoiceService.AddInvoice(invoiceDetail);
                return Ok(result);

            }
            catch
            {
                return NotFound("Thêm hoá đơn thất bại");
            }
            
        }

        [HttpGet("profit-report")]
        public async Task<IActionResult> GetProfitReport()
        {
            var reportData = await _repostService.GetProfitReportAsync();
            return Ok(reportData); // Trả về mã 200 kèm danh sách DTO
        }

        [HttpPut("update-status/{id}")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateInvoiceStatusDto dto)
        {
            try
            {
                var result = await _invoiceService.UpdateStatus(id, dto.Status);

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
