using Backend_1.Models.AddressModel;
using Backend_1.Models.Users;

namespace Backend_1.Models.Products
{
    public class Supplier
    {
        public int SupplierId { get; set; }
        public string SupplierName { get; set; } = string.Empty;
        public string PhoneSupplier {  get; set; } = string.Empty;
        public int AddressId { get; set; }
        public AddressSupplier Addresss { get; set; } = null!;
       
        public ICollection<Product> Products { get; set; }  = new List<Product>();

    }
}
