using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
   
    public class AppUser : IdentityUser<int> 
    {
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string WorkoutRoutine { get; set; }
        public string DietaryPlan { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        // public int Bmi { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<UserLike> LikedByUsers { get; set; }
        public ICollection<UserLike> LikedUsers { get; set; }
        public ICollection <UserInvite> InvitedByUsers { get; set; }
        public ICollection <UserInvite> InvitedUsers { get; set; }
        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesRecieved { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }

        public int GetBmi()
        {
            var Bmi = (int)((Weight) / Math.Pow(Height, 2)); 
            return Bmi;
        }
    }
}