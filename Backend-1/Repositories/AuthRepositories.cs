using Backend_1.Data;
using Backend_1.DTOs.Auth;
using Backend_1.Models.Users;


namespace Backend_1.Repositories
{
    public class AuthRepositories
    {
        public readonly AppDBContext _context;
        public AuthRepositories(AppDBContext context)
        {
            _context = context;
        }
        public bool ExistsbyPhone(string phone)
        {
            return _context.Users.Any(x => x.NumberPhone == phone);
        }
        public User? GetByPhone(string phone)
        {
            if (string.IsNullOrEmpty(phone)) return null;
            return _context.Users.FirstOrDefault(x=> x.NumberPhone == phone.Trim());
        }
        public  User? GetById(int id)
        {
            return _context.Users.FirstOrDefault(x => x.UserId == id);
        }
        public void Add( User user )
        {
            _context.Add(user);
            _context.SaveChanges();

        }
        public List<UserReponse> GetAll()
        {
            return _context.Users
                .Select(u => new UserReponse
                {
                    UserId = u.UserId,
                    NumberPhone = u.NumberPhone,
                    FullName = u.FullName,
                    Role = u.Role,
                    IsProfile = u.IsProfile
                })
                .ToList();
        }
        public UserReponse? UpdateRole(int id, string role)
        {
            var user = _context.Users
                .FirstOrDefault(x => x.UserId == id);

            if (user == null)
            {
                return null;
            }

            user.Role = role;

            _context.SaveChanges();

            return new UserReponse
            {
                UserId = user.UserId,
                NumberPhone = user.NumberPhone,
                FullName = user.FullName,
                Role = user.Role,
                IsProfile = user.IsProfile
            };
        }
    }
}
