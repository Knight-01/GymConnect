using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class InviteController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public InviteController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost("{Username}")]
        public async Task<ActionResult> AddInvite(string username)
        {
            var sourceUserId = User.GetUserId();
            var invitedUser = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
            var sourceUser = await _unitOfWork.InviteRepository.GetUserWithInvites(sourceUserId);

            if (invitedUser == null) return NotFound();

            if (sourceUser.UserName == username) return BadRequest("You cannot invite yourself");

            var userInvite = await _unitOfWork.InviteRepository.GetUserInvite(sourceUserId, invitedUser.Id);

            if (userInvite != null) return BadRequest("You already invited this user");

            userInvite = new Entities.UserInvite
            {
                SourceUserId = sourceUserId,
                InvitedUserId = invitedUser.Id
            };

            sourceUser.InvitedUsers.Add(userInvite);

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to Invite user");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InviteDto>>> GetUserInvites([FromQuery]InviteParams inviteParams)
        {
            inviteParams.UserId = User.GetUserId();
            var users = await _unitOfWork.InviteRepository.GetUserInvites(inviteParams);

            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(users);
        }
    }
}