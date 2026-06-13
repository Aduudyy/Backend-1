using Backend_1.DTOs.Auth;
using Backend_1.Models.Users;
using Backend_1.Repositories;
using FirebaseAdmin.Messaging;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend_1.Service.Auth
{
    public class RegisterService
    {
        private readonly AuthRepositories _authRepositories;
        private readonly FireBaseService _firebaseService;
        private readonly JWTHelper _jwtHelper;
        

        public RegisterService(AuthRepositories authRepositories, FireBaseService fireBaseService, JWTHelper jwtHelper)
        {
            _authRepositories = authRepositories;
            _firebaseService = fireBaseService;
            _jwtHelper = jwtHelper;

        }
        public async Task<AuthReponse> RegisterAsync(RegisterRequest request)
        {
            var phoneNumber = await _firebaseService.VerifyIdTokenAsync(request.IdToken);
            var existingUser = _authRepositories.GetByPhone(phoneNumber);
            if (existingUser != null)
            {
                throw new InvalidOperationException("Số điện thoại này đã được đăng ký tài khoản khác.");
            }
            var user = new User
            {
                NumberPhone = phoneNumber,
                FullName = request.FullName,
                PassWord = Passhelper.Hash(request.PassWord),
                Role = "User", // Mặc định quyền cho người mới
                IsProfile = true
            };
            Console.WriteLine(Passhelper.Hash("admin123"));
            _authRepositories.Add(user);
            var token = _jwtHelper.GenerateToken(user);
            return new AuthReponse
            {
                Message = "Đăng ký tài khoản thành công!",
                Token = token,
                User = new UserReponse
                {
                    UserId = user.UserId,
                    NumberPhone = user.NumberPhone,
                    FullName = user.FullName,
                    Role = user.Role,
                    IsProfile = true
                }
            };
        }
        public async Task<AuthReponse> LoginAsync(LoginRequest request)
        {


            var user =  _authRepositories.GetByPhone(request.NumberPhone);

            if (user == null)
            {
                throw new Exception("Tài khoản không tồn tại ");
            }
            bool IsPassWordValid = Passhelper.Verify(user.PassWord!, request.Password!);
            if (!IsPassWordValid)
            {
                throw new Exception("Mật khẩu không đúng");
            }
            var token = _jwtHelper.GenerateToken(user);
            return new AuthReponse
            {
                Message = "Đăng nhập thành công ,",
                Token = token,
                User = new UserReponse
                {
                    UserId = user.UserId,
                    NumberPhone = user.NumberPhone,
                    FullName = user.FullName,
                    Role = user.Role,
                    IsProfile = true


                }

            };
        }
        public List<UserReponse> GetAllUsers()
        {
            return _authRepositories.GetAll();
        }

        public UserReponse? UpdateRole(int id, string role)
        {
            if (string.IsNullOrWhiteSpace(role))
                return null;

            return _authRepositories.UpdateRole(id, role);
        }


    }
    
}

