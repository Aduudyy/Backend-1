using System.ComponentModel.DataAnnotations;

namespace Backend_1.Models.Users
{
    public class Profiles
    {
        [Key]
        public int UserId { get; set; }
        public DateTime BirthDay { get; set; }
        public int Gender { get; set; }
        public string? Avatar {  get; set; }
        public User user { get; set; } = null!;

    }
}
