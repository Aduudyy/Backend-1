namespace Backend_1.Models.AddressModel
{
    public class Ward
    {
        public int WardId { get; set; }

        public string WardName { get; set; } = null!;

        public int ProvinceId { get; set; }

        // Navigation
        public Province Province { get; set; } = null!;
    }
}
