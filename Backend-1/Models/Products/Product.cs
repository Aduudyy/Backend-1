using Backend_1.Models.Invoice;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend_1.Models.Products
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        [Required]
        [MaxLength(100)]
        public  string? ProductName { get; set; }
        public int Quantity {  get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public Decimal ImportPrice { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal SellPrice { get; set; }
        public DateTime? ProductionDate { get; set; }
        public DateTime? Expery { get; set; }
        [MaxLength(500)]
        public string? ImageUrl { get; set; }
        public Boolean IsActive { get; set; } = true;

        public int SupplierId   { get; set; }
        public Supplier? Supplier { get; set; }
        public int UnitId { get; set; }
        public Unit? Unit { get; set; }

    }
}
