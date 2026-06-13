using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_1.Migrations
{
    /// <inheritdoc />
    public partial class addInvoicessssss : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClientName",
                table: "Invoices",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "exportQuanity",
                table: "InvoiceDetail",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientName",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "exportQuanity",
                table: "InvoiceDetail");
        }
    }
}
