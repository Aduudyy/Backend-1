using Backend_1.Models.Client;
using Backend_1.Models.Products;
using Backend_1.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend_1.Service.Customer
{
    public class CustomerService
    {
        private readonly IRepository<Client> _irepository;
        public CustomerService(IRepository<Client> irepository)
        {
            _irepository = irepository;
        }
        public async Task<IEnumerable<Client>> GetAllCustomer()
        {
            return await _irepository.GetAllAsync();
        }
        public async Task<ServiceReponse<bool>> AddCustomer(Client client)
        {
            var reponse = new ServiceReponse<bool>();
            if (client == null || string.IsNullOrEmpty(client.CustomName))
            {
                reponse.Success = false;
                reponse.Message = "Thông tin sản phẩm không được trống";
                return reponse;
            }
            var result = await _irepository.Any(p => p.CustomName!.ToLower() == client.CustomName.ToLower());
            if (result)
            {
                reponse.Success = false;
                reponse.Message = "Cửa hàng đã tồn tại";
                return reponse;
            }
            try
            {
                await _irepository.AddAsync(client);
                reponse.Success = true;
                reponse.Message = "Thêm khách hàng mới thành công";
                return reponse;

            }
            catch (Exception ex)
            {
                reponse.Success = false;
                reponse.Message = ex.Message;
                return reponse;

            }
        }
        public async Task<ServiceReponse<bool>> UpdateProduct(Client client)
        {
            var reponse = new ServiceReponse<bool>();
            try
            {
                await _irepository.Update(client);
                reponse.Success = true;
                reponse.Message = " Cập nhật cửa hàng thành công";
                return reponse;
            }
            catch
            {
                reponse.Success = false;
                reponse.Message = " Cập nhật cửa hàng thất bại";
                return reponse;
            }
        }
        public async Task<bool> UpdateCustomerDebts(int customerId, int newDebts)
        {
            // 1. Tìm khách hàng theo ID từ Repository
            var customer = await _irepository.GetByIdAsync(customerId); // Hoặc hàm tìm kiếm tương đương của bạn
            if (customer == null)
            {
                return false;
            }

            // 2. Gán giá trị công nợ mới (hoặc customer.Debts += newDebts nếu là cộng dồn)
            customer.Debt = newDebts;

            // 3. Cập nhật vào DB thông qua Repository
            await _irepository.Update(customer);
            return true;
        }
    }
}
