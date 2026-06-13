using System.ComponentModel.DataAnnotations.Schema;

namespace Backend_1.Models.Products
{
    public class Category
    {
        public int categoryId { get; set; }
        public string? categoryname { get; set; }
        public bool IsActive { get; set; } = true;
        public int? ParentId { get; set; }
        [ForeignKey("ParentId")]
        public virtual Category? Parent { get; set; }
        public virtual ICollection<Category> Children { get; set; } = new List<Category>();
       
    }
}
