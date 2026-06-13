using Backend_1.Models.Users;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend_1.Models.Oders
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }
        public string? Status { get; set; }
        public DateTime OrderDate { get; set; }
        public string? Province { get; set; }
        public string? Ward { get; set; }
        public string? Note { get; set; }
        public ICollection<OrderItem>? orderItems { get; set; } = new List<OrderItem>();
    }
}
