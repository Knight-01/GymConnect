using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class UserForOnboardDto
    {
        
        public string PhotoUrl { get; set; }
        public string Introduction { get; set; }
        [Required] public int Height { get; set; }
        [Required] public int Weight { get; set; }
        
    }
}