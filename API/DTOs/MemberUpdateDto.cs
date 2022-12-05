namespace API.DTOs
{
    public class MemberUpdateDto
    {
        public string Introduction { get; set; }
        public string WorkoutRoutine { get; set; }
        public string DietaryPlan { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public int Age { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
}