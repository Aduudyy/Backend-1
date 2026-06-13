using System.ComponentModel.DataAnnotations;

namespace Backend_1.Models.Users
{
    public class Address
    {
        [Key]
        public int AddressId { get; set; }
        public int UserId { get; set; }
        public string? ReceiverName { get; set; }
        public string? Receiverphone { get; set; }
        public string? Province { get; set; }
        public string? Ward { get; set; }
        public string? Note {  get; set; }
        public bool IsDefaut { get; set; } = false;
        public User? user { get; set; } = null!;
    }
}
