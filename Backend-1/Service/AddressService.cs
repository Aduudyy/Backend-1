using Backend_1.Data;
using Backend_1.Models.AddressModel;
using Backend_1.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend_1.Service
{
    public class AddressService
    {
        private readonly IRepository<Province> _base;
        private readonly AppDBContext _context;
        public AddressService(IRepository<Province> @base, AppDBContext context)
        {
            _base = @base;
            _context = context;
        }
        public async Task<IEnumerable<Province>> GetAllProvince()
        {
            return await _base.GetAllAsync();
        }
        public async Task<IEnumerable<Ward>> GetWardByDistrict(int id)
        {
            return await _context.Set<Ward>()
                .Where(w => w.ProvinceId == id).ToListAsync();
        }
        public async Task<Province?> SearchProvince(int provinceId)
        {
           return await _base.GetByIdAsync(provinceId);
            
        }

    }
}
