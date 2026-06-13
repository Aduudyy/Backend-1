namespace Backend_1.DTOs.Product
{
    public class ProductCreateDto
    {
        public string ProductName { get; set; } = string.Empty;
        public decimal ImportPrice { get; set; }
        public decimal SellPrice { get; set; }
        public int Quantity { get; set; }
        public int SupplierId { get; set; }
        public DateTime ProductionDate { get; set; }
        public DateTime Expery { get; set; }
        public int UnitId { get; set; }

        // Đây là "vũ khí" để giải quyết lỗi 415 và nhận file ảnh
        public IFormFile? ImageFile { get; set; }
        public Boolean IsActive { get; set; }
    }
}
