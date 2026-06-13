namespace Backend_1.DTOs.Auth
{
    public class UserReponse
    {
        public int UserId { get; set; }
        public string? NumberPhone { get; set; }
        public string? FullName { get; set; }
        public string? Role { get; set; }
        public bool IsProfile { get; set; } = false;
    }
}
