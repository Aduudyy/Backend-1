using System.ComponentModel.DataAnnotations;

namespace Backend_1.Models.Products
{
    public class Unit
    {
        [Key]
        public int UnitId { get; set; }

        [Required]
        [StringLength(50)]
        public string UnitName { get; set; } = string.Empty;

        [StringLength(250)]
        public string? Description { get; set; } // Dấu ? cho phép Null nếu không có mô tả

        public bool IsActive { get; set; } = true;

        // Inverse Navigation Property - Mối quan hệ 1-nhiều với Product
        public virtual ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
