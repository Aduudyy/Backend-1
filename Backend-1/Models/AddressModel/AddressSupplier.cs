using Backend_1.Models.Products;
using System.ComponentModel.DataAnnotations;

namespace Backend_1.Models.AddressModel
{
    public class AddressSupplier
    {
        [Key]
        public int AddressId { get; set; }
        public string? DetailAddress { get; set; }
        public int ProvinceId { get; set; }
        public int DistrictId { get; set; }
        public int WardId { get; set; }
        public string? Province { get; set; } 
        public string? Ward { get; set; } 
        public int SupplierId { get; set; }
        public Supplier? Suppliers { get; set; }
       
    }
}
