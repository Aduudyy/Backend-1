using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Backend_1.Models.Users;

namespace Backend_1.Service
{
    public class JWTHelper
    {
        public readonly IConfiguration _configuration;
        public JWTHelper(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string GenerateToken(User user)
        {
            var jwtSetting = _configuration.GetSection("Jwt");
            var secretKey = jwtSetting["SecretKey"];
            var issuer = jwtSetting["Issuer"];
            var audience = jwtSetting["Audience"];
            if (string.IsNullOrWhiteSpace(secretKey))
                throw new Exception("Jwt key chưa được cấu hình ");


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey!));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim> { 
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Role, user.Role ?? "User")
                };
            var token = new JwtSecurityToken(

                issuer: issuer,
                audience: audience,
                claims : claims,
                expires : DateTime.UtcNow.AddHours(2),
                signingCredentials : credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token); 
        }
    }
}
