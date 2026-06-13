using Backend_1.Models.Client;
using Backend_1.Models.Products;

namespace Backend_1.Models.Invoice
{
    public class Invoice
    {
        public int InvoiceId { get; set; }
        public string? InvoiceCode { get; set; }
        public DateTime ExportDateProduct { get; set; }
        public int ClientId { get; set; }
        public string? ClientName { get; set; }
        public string Status { get; set; } = "Pending";
        public ICollection<InvoiceDetail>? InvoiceDetails { get; set; }

    }
}
