namespace API.DTOs
{
    public class MemberUpdateDto
    {
        public string Introduction { get; set; }
        public string WorkoutRoutine { get; set; }
        public string DietaryPlan { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
}