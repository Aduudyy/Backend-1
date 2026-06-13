namespace Backend_1.DTOs.Product
{
    public class ProductUpdateDto
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public Decimal ImportPrice { get; set; }
        public decimal SellPrice { get; set; }
        public int Quantity { get; set; }
        public int SupplierId { get; set; }
        public DateTime ProductionDate { get; set; }
        public DateTime Expery { get; set; }
        public int UnitId { get; set; }
        public string? ImageUrl { get; set; }
        public IFormFile? ImageFile { get; set; }
        public Boolean IsActive { get; set; }
        public int CategoryId { get; set; }
    }
}
