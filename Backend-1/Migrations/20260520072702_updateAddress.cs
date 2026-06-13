using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend_1.Migrations
{
    /// <inheritdoc />
    public partial class updateAddress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ward_District_DistrictId",
                table: "Ward");

            migrationBuilder.DropTable(
                name: "District");

            migrationBuilder.DropColumn(
                name: "District",
                table: "AddressSupplier");

            migrationBuilder.DropColumn(
                name: "Distrist",
                table: "Address");

            migrationBuilder.RenameColumn(
                name: "DistrictId",
                table: "Ward",
                newName: "ProvinceId");

            migrationBuilder.RenameIndex(
                name: "IX_Ward_DistrictId",
                table: "Ward",
                newName: "IX_Ward_ProvinceId");

            migrationBuilder.UpdateData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 3,
                columns: new[] { "ProvinceId", "WardName" },
                values: new object[] { 1, "Mai Dịch" });

            migrationBuilder.UpdateData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 4,
                columns: new[] { "ProvinceId", "WardName" },
                values: new object[] { 1, "Nghĩa Đô" });

            migrationBuilder.UpdateData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 5,
                columns: new[] { "ProvinceId", "WardName" },
                values: new object[] { 1, "Quan Hoa" });

            migrationBuilder.UpdateData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 6,
                columns: new[] { "ProvinceId", "WardName" },
                values: new object[] { 1, "Trung Hòa" });

            migrationBuilder.UpdateData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 7,
                columns: new[] { "ProvinceId", "WardName" },
                values: new object[] { 1, "Điện Biên" });

            migrationBuilder.UpdateData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 8,
                columns: new[] { "ProvinceId", "WardName" },
                values: new object[] { 1, "Kim Mã" });

            migrationBuilder.UpdateData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 9,
                columns: new[] { "ProvinceId", "WardName" },
                values: new object[] { 1, "Ngọc Hà" });

            migrationBuilder.UpdateData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 10,
                columns: new[] { "ProvinceId", "WardName" },
                values: new object[] { 1, "Đội Cấn" });

            migrationBuilder.UpdateData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 11,
                columns: new[] { "ProvinceId", "WardName" },
                values: new object[] { 1, "Liễu Giai" });

            migrationBuilder.UpdateData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 12,
                columns: new[] { "ProvinceId", "WardName" },
                values: new object[] { 1, "Láng Thượng" });

            migrationBuilder.InsertData(
                table: "Ward",
                columns: new[] { "WardId", "ProvinceId", "WardName" },
                values: new object[,]
                {
                    { 13, 1, "Ô Chợ Dừa" },
                    { 14, 1, "Khâm Thiên" },
                    { 15, 1, "Trung Liệt" },
                    { 16, 1, "Văn Miếu" },
                    { 17, 1, "Đại Kim" },
                    { 18, 1, "Định Công" },
                    { 19, 1, "Giáp Bát" },
                    { 20, 1, "Hoàng Liệt" },
                    { 21, 1, "Khương Đình" },
                    { 22, 1, "Khương Mai" },
                    { 23, 1, "Nhân Chính" },
                    { 24, 1, "Thanh Xuân Bắc" },
                    { 25, 2, "Tân Thịnh" },
                    { 26, 2, "Trung Thành" },
                    { 27, 2, "Hoàng Văn Thụ" },
                    { 28, 2, "Phan Đình Phùng" },
                    { 29, 2, "Quang Trung" },
                    { 30, 2, "Túc Duyên" },
                    { 31, 2, "Gia Sàng" },
                    { 32, 2, "Cam Giá" },
                    { 33, 2, "Đồng Quang" },
                    { 34, 2, "Ba Hàng" },
                    { 35, 2, "Bãi Bông" },
                    { 36, 2, "Đồng Tiến" },
                    { 37, 2, "Nam Tiến" },
                    { 38, 2, "Cải Đan" },
                    { 39, 2, "Bách Quang" },
                    { 40, 2, "Mỏ Chè" },
                    { 41, 2, "Hùng Sơn" },
                    { 42, 2, "La Bằng" },
                    { 43, 2, "Chùa Hang" },
                    { 44, 2, "Hóa Thượng" },
                    { 45, 2, "Đình Cả" },
                    { 46, 2, "Chợ Chu" },
                    { 47, 2, "Đu" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Ward_Provinces_ProvinceId",
                table: "Ward",
                column: "ProvinceId",
                principalTable: "Provinces",
                principalColumn: "ProvinceId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ward_Provinces_ProvinceId",
                table: "Ward");

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 41);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 42);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 43);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 44);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 45);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 46);

            migrationBuilder.DeleteData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 47);

            migrationBuilder.RenameColumn(
                name: "ProvinceId",
                table: "Ward",
                newName: "DistrictId");

            migrationBuilder.RenameIndex(
                name: "IX_Ward_ProvinceId",
                table: "Ward",
                newName: "IX_Ward_DistrictId");

            migrationBuilder.AddColumn<string>(
                name: "District",
                table: "AddressSupplier",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Distrist",
                table: "Address",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "District",
                columns: table => new
                {
                    DistrictId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProvinceId = table.Column<int>(type: "int", nullable: false),
                    DistrictName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_District", x => x.DistrictId);
                    table.ForeignKey(
                        name: "FK_District_Provinces_ProvinceId",
                        column: x => x.ProvinceId,
                        principalTable: "Provinces",
                        principalColumn: "ProvinceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "District",
                columns: new[] { "DistrictId", "DistrictName", "ProvinceId" },
                values: new object[,]
                {
                    { 1, "Cầu Giấy", 1 },
                    { 2, "Ba Đình", 1 },
                    { 3, "Đống Đa", 1 },
                    { 4, "Thành phố Thái Nguyên", 2 },
                    { 5, "Phổ Yên", 2 },
                    { 6, "Sông Công", 2 }
                });

            migrationBuilder.UpdateData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 3,
                columns: new[] { "DistrictId", "WardName" },
                values: new object[] { 2, "Điện Biên" });

            migrationBuilder.UpdateData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 4,
                columns: new[] { "DistrictId", "WardName" },
                values: new object[] { 2, "Kim Mã" });

            migrationBuilder.UpdateData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 5,
                columns: new[] { "DistrictId", "WardName" },
                values: new object[] { 3, "Láng Thượng" });

            migrationBuilder.UpdateData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 6,
                columns: new[] { "DistrictId", "WardName" },
                values: new object[] { 3, "Ô Chợ Dừa" });

            migrationBuilder.UpdateData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 7,
                columns: new[] { "DistrictId", "WardName" },
                values: new object[] { 4, "Tân Thịnh" });

            migrationBuilder.UpdateData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 8,
                columns: new[] { "DistrictId", "WardName" },
                values: new object[] { 4, "Trung Thành" });

            migrationBuilder.UpdateData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 9,
                columns: new[] { "DistrictId", "WardName" },
                values: new object[] { 5, "Bãi Bông" });

            migrationBuilder.UpdateData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 10,
                columns: new[] { "DistrictId", "WardName" },
                values: new object[] { 5, "Đồng Tiến" });

            migrationBuilder.UpdateData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 11,
                columns: new[] { "DistrictId", "WardName" },
                values: new object[] { 6, "Cải Đan" });

            migrationBuilder.UpdateData(
                table: "Ward",
                keyColumn: "WardId",
                keyValue: 12,
                columns: new[] { "DistrictId", "WardName" },
                values: new object[] { 6, "Bách Quang" });

            migrationBuilder.CreateIndex(
                name: "IX_District_ProvinceId",
                table: "District",
                column: "ProvinceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ward_District_DistrictId",
                table: "Ward",
                column: "DistrictId",
                principalTable: "District",
                principalColumn: "DistrictId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
