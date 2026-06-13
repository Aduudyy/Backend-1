namespace Backend_1.DTOs
{
    public class InvoiceDTO
    {
        public class InvoiceCreateDto
        {
            public int ClientId { get; set; }
            public string? ClientName { get; set; }
            public List<InvoiceProductDto> Products { get; set; } = new List<InvoiceProductDto>();
        }

        public class InvoiceProductDto
        {
            public int ProductId { get; set; }
            public int Quantity { get; set; }

        }
        public class UpdateInvoiceStatusDto
        {
            public string Status { get; set; } = string.Empty;
        }

        public class InvoiceResponseDto
        {
            public int InvoiceId { get; set; }

            public string? InvoiceCode { get; set; }

            public DateTime ExportDateProduct { get; set; }

            public string? ClientName { get; set; }

            public string Status { get; set; } = string.Empty;

            public decimal TotalAmount { get; set; }

            public List<InvoiceDetailDto> Details { get; set; } = new();
        }
        public class InvoiceDetailDto
        {
            public string ProductName { get; set; } = string.Empty;

            public int Quantity { get; set; }

            public decimal UnitPrice { get; set; }

            public decimal TotalPrice { get; set; }
        }
    }
}
