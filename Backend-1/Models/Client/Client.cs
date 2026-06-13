namespace Backend_1.Models.Client
{
    public class Client
    {
        public int ClientId { get; set; }
        public string? ClientName { get; set; }
        public string? CustomName { get; set; }
        public string? NumberPhone { get; set; }
        public string? Province { get; set; }
        public string? Ward { get; set; }
        public int Debt { get; set; }
        public string? Note { get; set; }
        public Boolean IsActive { get; set; }

    }
}
