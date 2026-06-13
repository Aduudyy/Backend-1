using Backend_1.Models.Users;
using System.ComponentModel.DataAnnotations;

namespace Backend_1.Models.Carts
{
    public class Cart
    {
        [Key]
        public int CartId { get; set; }
        [Required]
        public int UserId { get; set; }
        public User? User { get; set; }
        public ICollection<CartItems>? CartItems { get; set; } = new List<CartItems>();
    }
}
