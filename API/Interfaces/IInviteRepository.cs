using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IInviteRepository
    {
        Task<UserInvite> GetUserInvite(int sourceUserId, int invitedUserId);
        Task<AppUser> GetUserWithInvites(int userId);
        Task<PagedList<InviteDto>> GetUserInvites(InviteParams inviteParams);
    }
}