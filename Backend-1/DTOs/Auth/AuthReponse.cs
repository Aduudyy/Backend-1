namespace Backend_1.DTOs.Auth
{
    public class AuthReponse
    {
        public string? Message { get; set; }
        public string? Token { get; set; }
        public UserReponse? User { get; set; }
    }
}
