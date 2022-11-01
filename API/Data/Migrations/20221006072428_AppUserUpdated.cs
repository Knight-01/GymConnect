using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class AppUserUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LookingFor",
                table: "AspNetUsers",
                newName: "WorkoutRoutine");

            migrationBuilder.RenameColumn(
                name: "Interests",
                table: "AspNetUsers",
                newName: "DietaryPlan");

            migrationBuilder.AddColumn<float>(
                name: "Height",
                table: "AspNetUsers",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "Weight",
                table: "AspNetUsers",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Height",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "WorkoutRoutine",
                table: "AspNetUsers",
                newName: "LookingFor");

            migrationBuilder.RenameColumn(
                name: "DietaryPlan",
                table: "AspNetUsers",
                newName: "Interests");
        }
    }
}
