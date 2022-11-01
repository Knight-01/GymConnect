using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class UserForOnboardDto
    {
        [Required] public string City { get; set; }
        // [Required] public string State { get; set; }

        [Required]
        [DataType(DataType.DateTime, ErrorMessage = "Please enter a valid datetime")]   
        public DateTime DateOfBirth { get; set; }
        // [Required] public string Gender { get; set; }
        // [Required] public string KnownAs { get; set; }
        public string Introduction { get; set; }
        [Required] public int Height { get; set; }
        [Required] public int Weight { get; set; }
        
    }
}