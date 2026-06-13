using Backend_1.Data;
using Backend_1.Models.AddressModel;
using Backend_1.Models.Products;
using Backend_1.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Backend_1.Service.Suppliers
{
    public class SupplierService 
    {
        private readonly IRepository<Supplier> _base;
        private readonly AppDBContext _context;
        public SupplierService(IRepository<Supplier> baserepository, AppDBContext context)
        {
            _base = baserepository;
            _context = context;
        }

        public async Task<List<Supplier>> GetAllSuppliers()
        {
            return await _context.Supplierss
                .Include(x => x.Addresss).ToListAsync();
        }
        public async Task<Supplier?> GetSupplierById(int id)
        {
            return await _base.GetByIdAsync(id);
        } 

        public async Task<ServiceReponse<bool>> AddSupplier([FromBody]Supplier supplier)
        {
            var reponse = new ServiceReponse<bool>();
            if(supplier == null)
            {
                reponse.Success = false;
                reponse.Message = " Tên nhà cung cấp rỗng";
                return reponse;
            } 
            var result = await _base.Any(s => s.SupplierName.ToLower() == supplier.SupplierName.ToLower());
            if (result)
            {
                reponse.Success = false;
                reponse.Message = "Đã có nhà cung cấp ";
                return reponse;
            }
            try
            { 
                await _base.AddAsync(supplier);
                reponse.Success = true;
                reponse.Message = "Đã thêm nhà cung cấp mới";
                return reponse;
            }
            catch(Exception ex)
            {
                reponse.Success = false;
                reponse.Message = ex.Message;
                return reponse;
            }

        }
        public async Task<ServiceReponse<bool>> UpdateSupplier(Supplier supplier)
        {
            var reponse = new ServiceReponse<bool>();
            try
            {
                await _base.Update(supplier);
                reponse.Success = true;
                reponse.Message = " Đã sửa thông tin nhà cung cấp";
                return reponse;
            }
            catch
            {
                reponse.Success = false;
                reponse.Message = " Thay đổi thất bại";
                return reponse;
            }
        }
        //Task<bool> DeleteProduct(int id);
        public async Task<ServiceReponse<bool>> DeleteSupplier(int id)
        {
            var reponse = new ServiceReponse<bool>();
            var product = await _base.GetByIdAsync(id);
            if (product == null)
            {
                reponse.Success = false;
                reponse.Message = " Sản phẩm không tồn tại";
                return reponse;
            }
            try
            {
                await _base.Delete(product);
                reponse.Success = true;
                reponse.Message = " Xoá sản phẩm thành công sản phẩm thành công";
                return reponse;
            }
            catch
            {
                reponse.Success = false;
                reponse.Message = " Xoá sản phẩm thất bại";
                return reponse;
            }

        }      
    }
}
