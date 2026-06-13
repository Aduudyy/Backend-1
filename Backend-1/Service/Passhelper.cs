using Microsoft.AspNetCore.Identity;

namespace Backend_1.Service
{
    public class Passhelper
    {
        private static readonly PasswordHasher<string> _hasher = new();
        public static string Hash(string password)
        {
            return _hasher.HashPassword(null!, password.Trim());
        }
        public static bool Verify(string hashedPass, string inputPass)
        {
            var result = _hasher.VerifyHashedPassword(null!, hashedPass.Trim(), inputPass.Trim());
            return result == PasswordVerificationResult.Success
                || result == PasswordVerificationResult.SuccessRehashNeeded
                ;
        }
    }
}
