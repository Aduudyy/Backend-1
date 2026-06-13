using Backend_1.Models.Products;
using System.ComponentModel.DataAnnotations;

namespace Backend_1.Models.Carts
{
    public class CartItems
    {
        [Key]
        public int CartItemId { get; set; }
        public int Quantity { get; set; }
        public int CartId { get; set; }
        public Cart? Cart { get; set; }
        public int ProductId { get; set; }
        public Product? Product { get; set; }


    }
}
