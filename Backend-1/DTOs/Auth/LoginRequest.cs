using System.Text.Json.Serialization;

namespace Backend_1.DTOs.Auth
{
    public class LoginRequest
    {
        [JsonPropertyName("NumberPhone")]
        public string NumberPhone { get; set; } = string.Empty;

        [JsonPropertyName("Password")]
        public string Password { get; set; } = string.Empty;
    }
}
