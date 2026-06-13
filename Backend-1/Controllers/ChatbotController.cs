using Backend_1.DTOs;
using Backend_1.Service.ChatBot;
using Microsoft.AspNetCore.Mvc;

namespace Backend_1.Controllers
{
    [ApiController]
    [Route("api/chatbot")]
    public class ChatbotController : ControllerBase
    {
        private readonly ChatbotService _chatbotService;

        public ChatbotController(ChatbotService chatbotService)
        {
            _chatbotService = chatbotService;
        }

        [HttpPost("ask")]
        public async Task<IActionResult> Ask([FromBody] ChatRequest request)
        {
            if (string.IsNullOrEmpty(request.Message))
            {
                return BadRequest(new { message = "Tin nhắn không được để trống" });
            }

            var result = await _chatbotService.AskAiAsync(request);
            return Ok(result);
        }
    }
}
