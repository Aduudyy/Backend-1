namespace Backend_1.DTOs
{
    public class ProfitRepostDTO
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public int TotalQuantitySold { get; set; } // Tổng số lượng đã bán
        public decimal TotalRevenue { get; set; }   // Tổng doanh thu (Tiền bán)
        public decimal TotalCost { get; set; }      // Tổng giá vốn (Tiền nhập)
        public decimal TotalProfit { get; set; }
    }
}
