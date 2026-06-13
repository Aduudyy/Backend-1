//using Backend_1.Migrations;
using Backend_1.Models.AddressModel;
using Backend_1.Models.Carts;
using Backend_1.Models.Client;
using Backend_1.Models.Invoice;
using Backend_1.Models.Oders;
using Backend_1.Models.Products;
using Backend_1.Models.Users;
using Backend_1.Service;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Backend_1.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Supplier> Supplierss { get; set; }
        public DbSet<AddressSupplier> AddressSupplier { get; set; }
        public DbSet<Province> Provinces { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Category> Categories { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Supplier>()
                 .HasOne(s => s.Addresss)
                 .WithOne(a => a.Suppliers)
                 .HasForeignKey<AddressSupplier>(a => a.SupplierId)
                 .OnDelete(DeleteBehavior.Cascade);

            var adminAccount = new User
            {
                UserId = 1, // Bắt buộc phải chỉ định ID cụ thể khi dùng HasData
                NumberPhone = "+84973987654", // Bạn có thể đổi thành số của bạn
                FullName = "Quản Trị Viên Hệ Thống",
                Role = "Admin", // Quyền Admin tối cao
                IsProfile = false,
                PassWord = "AQAAAAIAAYagAAAAEH4XzC2dpdKS8EqRpcSzbAqVKCegvmHTiG8DjO5XQyn8WXnqhNVJXC2wN186fzEZTw==",
            };
            modelBuilder.Entity<User>().HasData(adminAccount);

            modelBuilder.Entity<Category>().HasData(
                new Category
                {
                    categoryId = 1,
                    categoryname = "Kem",
                    IsActive = true,
                },
                new Category
                {
                    categoryId = 2,
                    categoryname = "Sữa Chua",
                    IsActive = true,
                }
                );
            
            modelBuilder.Entity<Province>().HasData(
                new Province { ProvinceId = 1, ProvinceName = "Hà Nội" },
                 new Province { ProvinceId = 2, ProvinceName = "Thái Nguyên" }
                
               
            );

            modelBuilder.Entity<Ward>().HasData(
                    new Ward { WardId = 1, WardName = "Dịch Vọng", ProvinceId = 1 },
                    new Ward { WardId = 2, WardName = "Dịch Vọng Hậu", ProvinceId = 1 },
                    new Ward { WardId = 3, WardName = "Mai Dịch", ProvinceId = 1 },
                    new Ward { WardId = 4, WardName = "Nghĩa Đô", ProvinceId = 1 },
                    new Ward { WardId = 5, WardName = "Quan Hoa", ProvinceId = 1 },
                    new Ward { WardId = 6, WardName = "Trung Hòa", ProvinceId = 1 },

                    // Ba Đình
                    new Ward { WardId = 7, WardName = "Điện Biên", ProvinceId = 1 },
                    new Ward { WardId = 8, WardName = "Kim Mã", ProvinceId = 1 },
                    new Ward { WardId = 9, WardName = "Ngọc Hà", ProvinceId = 1 },
                    new Ward { WardId = 10, WardName = "Đội Cấn", ProvinceId = 1 },
                    new Ward { WardId = 11, WardName = "Liễu Giai", ProvinceId = 1 },

                    // Đống Đa
                    new Ward { WardId = 12, WardName = "Láng Thượng", ProvinceId = 1 },
                    new Ward { WardId = 13, WardName = "Ô Chợ Dừa", ProvinceId = 1 },
                    new Ward { WardId = 14, WardName = "Khâm Thiên", ProvinceId = 1 },
                    new Ward { WardId = 15, WardName = "Trung Liệt", ProvinceId = 1 },
                    new Ward { WardId = 16, WardName = "Văn Miếu", ProvinceId = 1 },

                    // Hoàng Mai
                    new Ward { WardId = 17, WardName = "Đại Kim", ProvinceId = 1 },
                    new Ward { WardId = 18, WardName = "Định Công", ProvinceId = 1 },
                    new Ward { WardId = 19, WardName = "Giáp Bát", ProvinceId = 1 },
                    new Ward { WardId = 20, WardName = "Hoàng Liệt", ProvinceId = 1 },

                    // Thanh Xuân
                    new Ward { WardId = 21, WardName = "Khương Đình", ProvinceId = 1 },
                    new Ward { WardId = 22, WardName = "Khương Mai", ProvinceId = 1 },
                    new Ward { WardId = 23, WardName = "Nhân Chính", ProvinceId = 1 },
                    new Ward { WardId = 24, WardName = "Thanh Xuân Bắc", ProvinceId = 1 },



                    // =========================
                    // THÁI NGUYÊN
                    // =========================

                    // TP Thái Nguyên
                    new Ward { WardId = 25, WardName = "Tân Thịnh", ProvinceId = 2 },
                    new Ward { WardId = 26, WardName = "Trung Thành", ProvinceId = 2 },
                    new Ward { WardId = 27, WardName = "Hoàng Văn Thụ", ProvinceId = 2 },
                    new Ward { WardId = 28, WardName = "Phan Đình Phùng", ProvinceId = 2 },
                    new Ward { WardId = 29, WardName = "Quang Trung", ProvinceId = 2 },
                    new Ward { WardId = 30, WardName = "Túc Duyên", ProvinceId = 2 },
                    new Ward { WardId = 31, WardName = "Gia Sàng", ProvinceId = 2 },
                    new Ward { WardId = 32, WardName = "Cam Giá", ProvinceId = 2 },
                    new Ward { WardId = 33, WardName = "Đồng Quang", ProvinceId = 2 },

                    // Phổ Yên
                    new Ward { WardId = 34, WardName = "Ba Hàng", ProvinceId = 2 },
                    new Ward { WardId = 35, WardName = "Bãi Bông", ProvinceId = 2 },
                    new Ward { WardId = 36, WardName = "Đồng Tiến", ProvinceId = 2 },
                    new Ward { WardId = 37, WardName = "Nam Tiến", ProvinceId = 2 },

                    // Sông Công
                    new Ward { WardId = 38, WardName = "Cải Đan", ProvinceId = 2 },
                    new Ward { WardId = 39, WardName = "Bách Quang", ProvinceId = 2 },
                    new Ward { WardId = 40, WardName = "Mỏ Chè", ProvinceId = 2 },

                    // Đại Từ
                    new Ward { WardId = 41, WardName = "Hùng Sơn", ProvinceId = 2 },
                    new Ward { WardId = 42, WardName = "La Bằng", ProvinceId = 2 },

                    // Đồng Hỷ
                    new Ward { WardId = 43, WardName = "Chùa Hang", ProvinceId = 2 },
                    new Ward { WardId = 44, WardName = "Hóa Thượng", ProvinceId = 2 },

                    // Võ Nhai
                    new Ward { WardId = 45, WardName = "Đình Cả", ProvinceId = 2 },

                    // Định Hóa
                    new Ward { WardId = 46, WardName = "Chợ Chu", ProvinceId = 2 },

                    // Phú Lương
                    new Ward { WardId = 47, WardName = "Đu", ProvinceId = 2 }


            );
            modelBuilder.Entity<Unit>().HasData(
                new Unit { UnitId = 1, UnitName = "Hộp", Description = "Đơn vị tính theo hộp", IsActive = true },
                new Unit { UnitId = 2, UnitName = "Que", Description = "Đơn vị tính theo que/cây", IsActive = true },
                new Unit { UnitId = 3, UnitName = "Thùng", Description = "Đơn vị tính theo thùng đại lý", IsActive = true }
            );

            // 2. Tạo đối tượng Admin mặc định
            
        }
       
    }
    
}
