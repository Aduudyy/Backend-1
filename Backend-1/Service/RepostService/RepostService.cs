using Backend_1.Data;
using Backend_1.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Backend_1.Service.RepostService
{
    public class RepostService
    {
        private readonly AppDBContext _context;

        public RepostService(AppDBContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<ProfitRepostDTO>> GetProfitReportAsync()
        {
            return await _context.Invoices
                .Where(x => x.Status == "Completed")
                .SelectMany(x => x.InvoiceDetails!)
                .GroupBy(d => new
                {
                    d.productId,
                    d.product!.ProductName
                })
                .Select(g => new ProfitRepostDTO
                {
                    ProductId = g.Key.productId,
                    ProductName = g.Key.ProductName,

                    TotalQuantitySold = g.Sum(x => x.exportQuanity),

                    TotalRevenue = g.Sum(x => x.TotalPrice),

                    TotalCost = g.Sum(x => x.exportQuanity * x.UnitPrice * 0.6m), // nếu chưa có import price thì tạm

                    TotalProfit = g.Sum(x => x.TotalPrice) -
                                  g.Sum(x => x.exportQuanity * x.UnitPrice * 0.6m)
                })
                .ToListAsync();
        }
    }
}
