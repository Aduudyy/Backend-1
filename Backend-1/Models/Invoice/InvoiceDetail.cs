using Backend_1.Models.Products;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend_1.Models.Invoice
{
    public class InvoiceDetail
    {
        public int InvoiceDetailId { get; set; }
        public int InvoiceId { get; set; }
        public Invoice? Invoice { get; set; }
        public int exportQuanity {  get; set; }
        public int ExportProduct { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal UnitPrice { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }
        public int productId { get; set; }
        public Product? product { get; set; }

    }
}