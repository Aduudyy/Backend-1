using FirebaseAdmin.Auth;

namespace Backend_1.Service
{
    public class FireBaseService
    {
        public async Task<string> VerifyIdTokenAsync(string IdToken)
        {
            if (string.IsNullOrWhiteSpace(IdToken))
                throw new ArgumentNullException("Mã xác thực không được để trống");

            try
            {
                // 1. Xác thực token
                var decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(IdToken);

                // 2. Bóc lấy số điện thoại ngay tại đây
                if (decodedToken.Claims.TryGetValue("phone_number", out var phone))
                {
                    return phone.ToString();
                }

                throw new Exception("Xác thực thành công nhưng Firebase không trả về số điện thoại!");
            }
            catch (FirebaseAuthException )
            {
                // Log lỗi hoặc xử lý khi token giả, hết hạn...
                throw new Exception("Mã xác thực không hợp lệ hoặc đã hết hạn!");
            }
        }
    }
}
