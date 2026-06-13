namespace Backend_1.DTOs.Auth
{
    public class RegisterRequest
    {
        public string IdToken { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string PassWord {  get; set; } = string.Empty;
    }
    public class SendOtpRequest
    {
        public string PhoneNumber { get; set; } = string.Empty;
    }

    public class VerifyOtpRequest
    {
        public string Phone { get; set; } = string.Empty;
        public string Otp { get; set; } = string.Empty;
    }
}
