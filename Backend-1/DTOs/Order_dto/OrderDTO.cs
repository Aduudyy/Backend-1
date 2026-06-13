namespace Backend_1.DTOs.Order_dto
{
    public class OrderDTO
    {
        public int? UserId { get; set; }
        public string? Province { get; set; }
        public string? Ward { get; set; }
        public string? Note { get; set; }

        public List<CreateOrderItemDto> Products { get; set; } = new();
    }
    public class CreateOrderItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
