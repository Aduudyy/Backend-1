using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_1.Migrations
{
    /// <inheritdoc />
    public partial class addInvoicess : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientName",
                table: "Invoices");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClientName",
                table: "Invoices",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
