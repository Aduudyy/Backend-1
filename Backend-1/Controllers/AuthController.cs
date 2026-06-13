using Backend_1.Data;
using Backend_1.DTOs;
using Backend_1.DTOs.Auth;
using Backend_1.Models.Users;
using Backend_1.Repositories;
using Backend_1.Service;
using Backend_1.Service.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Backend_1.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase

    {
        public readonly RegisterService _registerService;
        public readonly AuthRepositories _authRepositories;
        public readonly FireBaseService _fireBaseService;
        public readonly AppDBContext _context;


        public AuthController(RegisterService registerService, AuthRepositories authRepositories, FireBaseService fireBaseService, AppDBContext context)
        {
            _registerService = registerService;
            _authRepositories = authRepositories;
            _fireBaseService = fireBaseService;
            _context = context;

        }
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_registerService.GetAllUsers());
        }
        [HttpPut("update-role/{id}")]
        public IActionResult UpdateRole(int id, [FromBody] string role)
        {
            var result = _registerService.UpdateRole(id, role);

            if (result == null)
                return NotFound("User không tồn tại hoặc role không hợp lệ");

            return Ok(result);
        }
        [HttpPost("register")]
        public async Task<IActionResult> Registers([FromBody] RegisterRequest request)
        {
            try
            {
                var result = await _registerService.RegisterAsync(request);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
            catch (Exception)
            {
                {
                    return StatusCode(500, "Lỗi hệ thống");

                }
            }

        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var result = await _registerService.LoginAsync(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }
        [HttpPost("send-otp")]
        public IActionResult SendOtp([FromBody] SendOtpRequest request)
        {
            var user = _authRepositories.GetByPhone(request.PhoneNumber);

            if (user != null)
            {
                return BadRequest(new { message = "Số điện thoại này đã được đăng ký tài khoản khác." });
            }
            return Ok(new { message = "Số điện thoại hợp lệ. Vui lòng gửi OTP qua Firebase." });
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpRequest request)
        {
            try
            {
                var phoneNumber = await _fireBaseService.VerifyIdTokenAsync(request.Otp);

                if (phoneNumber != request.Phone)
                {
                    return BadRequest(new { message = "Số điện thoại xác thực không khớp." });
                }

                return Ok(new { message = "Xác thực OTP thành công!" });
            }
            catch (Exception)
            {
                return BadRequest(new { message = "Mã OTP không hợp lệ hoặc đã hết hạn." });
            }
        }
        [HttpGet("search/{id}")]
        public  User? GetUserById(int id)
        {
            return  _authRepositories.GetById(id);

        }

        [Authorize]
        [HttpGet("profile")]
        public IActionResult GetProfile()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = _context.Users
                .FirstOrDefault(x => x.UserId == int.Parse(userId!));

            return Ok(user);
        }

    }
}
