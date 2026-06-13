namespace Backend_1.Models.AddressModel
{
    public class Province
    {
        public int ProvinceId { get; set; }

        public string ProvinceName { get; set; } = null!;

        // Navigation
        public ICollection<Ward> wasrds { get; set; } = new List<Ward>();
    }
}
