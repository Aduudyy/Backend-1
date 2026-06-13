using Backend_1.Data;
using Backend_1.DTOs;
using Backend_1.DTOs.Auth;
using Backend_1.Models;
using Backend_1.Models.Products;
using Backend_1.Repositories;
using Backend_1.Service;
using Backend_1.Service.Auth;
using Backend_1.Service.CategoriesService;
using Backend_1.Service.ChatBot;
using Backend_1.Service.Customer;
using Backend_1.Service.Export;
using Backend_1.Service.Orders;
using Backend_1.Service.Products;
using Backend_1.Service.RepostService;
using Backend_1.Service.Suppliers;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

//Add Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod();
        }
        );
});

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddControllers()
.AddJsonOptions(x =>
{
    x.JsonSerializerOptions.ReferenceHandler =
        System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});
builder.Services.AddHttpClient();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDBContext>(options =>
options.UseSqlServer(
    builder.Configuration.GetConnectionString("DefaultConnection")));

// Load FireBase bằng Stream
var path = Path.Combine(Directory.GetCurrentDirectory(), "firebase-service-account.json");
if (!File.Exists(path))
{
    throw new FileNotFoundException("Không tìm thấy firebase");
}
var serviceAccountCredential = CredentialFactory.FromFile<ServiceAccountCredential>(path);
FirebaseApp.Create(new AppOptions
{
    Credential = serviceAccountCredential.ToGoogleCredential(),
}
);
builder.Services.AddScoped<AuthRepositories>();
builder.Services.AddScoped<AuthReponse>();
builder.Services.AddScoped<FireBaseService>();
builder.Services.AddScoped<RegisterService>();
builder.Services.AddScoped<JWTHelper>();
builder.Services.AddScoped(typeof(IRepository<>) , typeof(Baserepository<>));
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<SupplierService>();
builder.Services.AddScoped<AddressService>();
builder.Services.AddScoped<CategoryService>();
builder.Services.AddScoped<CustomerService>();
builder.Services.AddScoped<InvoiceService>();
builder.Services.AddScoped<ProfitRepostDTO>();
builder.Services.AddScoped<RepostService>();
builder.Services.AddScoped<ChatbotService>();
builder.Services.AddScoped<OrderService>();







var jwtSetting = builder.Configuration.GetSection("Jwt");
var secretKey = jwtSetting["SecretKey"];

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(option =>
{
    option.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSetting["Issuer"],
        ValidAudience = jwtSetting["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey!))
    };

}
);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddAuthorization();


var app = builder.Build();

app.UseCors("AllowAngularApp");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles();
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
