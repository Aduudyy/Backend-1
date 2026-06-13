using Backend_1.DTOs;
using Backend_1.Service.Products;
using System.Text;
using System.Text.Json;

namespace Backend_1.Service.ChatBot
{
    public class ChatbotService
    {
        private readonly HttpClient _httpClient;
        private readonly ProductService _productService; // Inject service lấy sản phẩm để Bot đọc dữ liệu
        private readonly IConfiguration _configuration;

        public ChatbotService(HttpClient httpClient, ProductService productService, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _productService = productService;
            _configuration = configuration;
        }

        public async Task<ChatResponse> AskAiAsync(ChatRequest request)
        {
            try
            {
                var productContext = new StringBuilder();

                // Đặt trong khối try-catch nhỏ để nếu Database có lỗi thì Bot vẫn sống và tư vấn chung chung được
                try
                {
                    var allProducts = await _productService.GetAllProduct();
                    if (allProducts != null && allProducts.Any())
                    {
                        foreach (var p in allProducts)
                        {
                            productContext.AppendLine($"- Tên: {p.ProductName}, Giá: {p.SellPrice:N0}đ, Thương hiệu: {p.Supplier}");
                        }
                    }
                }
                catch (Exception dbEx)
                {
                    // Log lỗi DB ra terminal để bạn sửa, nhưng không làm crash Bot
                    Console.WriteLine($"[CẢNH BÁO DATABASE]: Không lấy được sản phẩm từ DB. Chi tiết: {dbEx.Message}");
                }

                // Thiết lập kịch bản dặn dò AI
                string systemInstruction = $"Bạn là trợ lý ảo thông minh của cửa hàng kem Mỹ Anh. " +
                                           $"Nhiệm vụ của bạn là tư vấn nhiệt tình, báo giá và gợi ý sản phẩm cho khách hàng. " +
                                           $"Hãy nói chuyện thân thiện, ngắn gọn và sử dụng icon phù hợp. ";

                // Nếu có dữ liệu sản phẩm thì nạp vào, nếu không có thì AI sẽ tự tư vấn theo kiến thức thông thường của nó
                if (productContext.Length > 0)
                {
                    systemInstruction += $"\nDưới đây là danh sách sản phẩm hiện có trong database của cửa hàng, bạn hãy dựa vào đây để tư vấn:\n" + productContext.ToString();
                }
                else
                {
                    systemInstruction += "\nHiện tại hệ thống dữ liệu kho đang bảo trì, hãy tư vấn các loại kem phổ biến một cách chung chung và khuyên khách ghé lại sau nhé.";
                }

                // Cấu hình gửi lên Google Gemini
                var apiKey = _configuration["AiConfig:ApiKey"];
                // Sử dụng phiên bản ổn định v1 kết hợp với mô hình cập nhật mới nhất
                var apiUrl = $"https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key={apiKey}";
                var requestData = new
                {
                    contents = new[]
                    {
                new {
                    parts = new[] {
                        new { text = systemInstruction + "\n\nKhách: " + request.Message }
                    }
                }
            }
                };

                _httpClient.DefaultRequestHeaders.Clear();
                var response = await _httpClient.PostAsJsonAsync(apiUrl, requestData);

                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"[LỖI GEMINI API]: {errorContent}");
                    return new ChatResponse { Reply = "Xin lỗi bạn, bộ não của tôi đang bị quá tải một chút. 😭" };
                }

                var jsonResponse = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"[GEMINI RESPONSE JSON]: {jsonResponse}");
                using var doc = JsonDocument.Parse(jsonResponse);
                var root = doc.RootElement;

                if (root.TryGetProperty("candidates", out var candidates) && candidates.GetArrayLength() > 0)
                {
                    var firstCandidate = candidates[0];
                    if (firstCandidate.TryGetProperty("content", out var content) &&
                        content.TryGetProperty("parts", out var parts) && parts.GetArrayLength() > 0)
                    {
                        string aiReply = parts[0].GetProperty("text").GetString() ?? "Tôi chưa hiểu ý bạn lắm.";
                        return new ChatResponse { Reply = aiReply };
                    }
                }
                if (root.TryGetProperty("promptFeedback", out var feedback))
                {
                    Console.WriteLine($"[CẢNH BÁO AI]: Google từ chối sinh nội dung do bộ lọc an toàn: {feedback}");
                }

                return new ChatResponse { Reply = "Câu hỏi này nằm ngoài phạm vi hiểu biết của tôi, bạn hỏi câu khác nhé! 🍦" };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[LỖI HỆ THỐNG]: {ex.Message}");
                return new ChatResponse { Reply = "Có lỗi hệ thống xảy ra, vui lòng thử lại sau!" };
            }
        }
    }
}
