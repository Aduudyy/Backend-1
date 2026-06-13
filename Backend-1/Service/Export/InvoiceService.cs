using Backend_1.Data;
using Backend_1.DTOs;
using Backend_1.Models.Invoice;
using Backend_1.Models.Oders;
using Backend_1.Models.Products;
using Backend_1.Repositories;
using Backend_1.Service.Products;
using Microsoft.EntityFrameworkCore;
using static Backend_1.Service.Export.InvoiceService;

namespace Backend_1.Service.Export
{
    public class InvoiceService
    {

        // Inject UnitOfWork (hoặc DbContext / các Repository riêng lẻ của bạn)
        private readonly IRepository<Invoice> _repository;
        private readonly AppDBContext _context;
        private readonly ProductService _productService;

        public InvoiceService(IRepository<Invoice> repository, AppDBContext context, ProductService productService)
        {
            _repository = repository;
            _context = context;
            _productService = productService;
        }

        public async Task<IEnumerable<Invoice>> GetAll()
        {
            return await _context.Invoices
                .Include(x => x.InvoiceDetails!)
                    .ThenInclude(d => d.product)
                .ToListAsync();
        }


        public async Task<Invoice> AddInvoice(InvoiceDTO.InvoiceCreateDto dto)
        {
            if (dto == null || dto.Products == null || !dto.Products.Any())
                throw new ArgumentException("Hóa đơn phải có ít nhất một sản phẩm.");

            string invoiceCode = await GenerateExportCode();

            var invoice = new Invoice
            {
                InvoiceCode = invoiceCode,
                ExportDateProduct = DateTime.Now,
                ClientId = dto.ClientId,
                ClientName = dto.ClientName,
                Status = "Pending",
                InvoiceDetails = new List<InvoiceDetail>()
            };

            foreach (var item in dto.Products)
            {
                var product = await _context.Products
                    .FirstOrDefaultAsync(x => x.ProductId == item.ProductId);

                if (product == null)
                    continue;

                var detail = new InvoiceDetail
                {
                    productId = product.ProductId,
                    ExportProduct = product.ProductId,

                    exportQuanity = item.Quantity,

                    UnitPrice = product.SellPrice,

                    TotalPrice = item.Quantity * product.SellPrice,

                    product = product
                };

                invoice.InvoiceDetails.Add(detail);
            }

            await _context.Invoices.AddAsync(invoice);
            await _context.SaveChangesAsync();

            return invoice;
        }



        // Hàm phụ hỗ trợ sinh mã hóa đơn tự động độc lập
        public async Task<string> GenerateExportCode()
        {
            var today = DateTime.Now.ToString("yyyyMMdd");

            var lastOrder = await _context.Invoices
                .Where(x => x.InvoiceCode!.StartsWith($"PX{today}"))
                .OrderByDescending(x => x.InvoiceCode)
                .FirstOrDefaultAsync();

            int number = 1;

            if (lastOrder != null)
            {
                var lastNumberStr = lastOrder.InvoiceCode!.Replace($"PX{today}", "");

                if (int.TryParse(lastNumberStr, out int lastNumber))
                {
                    number = lastNumber + 1;
                }
            }

            return $"PX{today}{number:D4}";
        }
        public async Task<bool> UpdateStatus(int invoiceId, string status)
        {
            var invoice = await _context.Invoices
                .Include(x => x.InvoiceDetails)
                .FirstOrDefaultAsync(x => x.InvoiceId == invoiceId);

            if (invoice == null)
                return false;

            var validStatus = new[] { "Pending", "Completed", "Cancelled" };

            if (!validStatus.Contains(status))
                throw new ArgumentException("Status không hợp lệ.");
            if (status == "Cancelled" && invoice.Status != "Cancelled")
            {
                foreach (var detail in invoice.InvoiceDetails ?? Enumerable.Empty<InvoiceDetail>())

                {
                    var product = await _context.Products
                        .FirstOrDefaultAsync(x => x.ProductId == detail.productId);

                    if (product != null)
                    {
                        product.Quantity += detail.exportQuanity;
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

