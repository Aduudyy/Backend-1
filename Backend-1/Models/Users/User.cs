using Backend_1.Models.Carts;
using Backend_1.Models.Oders;
using System.ComponentModel.DataAnnotations;

namespace Backend_1.Models.Users
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string? PassWord { get; set; }
        public string? NumberPhone { get; set; }
        public string? FullName { get; set; }
        public string Role { get; set; } = "User";
        public bool IsProfile { get; set; } = false;
        public Profiles? Profile { get; set; } //navigation
        public ICollection<Address>? Addresses { get; set; } = new List<Address>();
        public ICollection<Order>? Orders { get; set; } = new List<Order>();
        public Cart? carts { get; set; }

    }
}