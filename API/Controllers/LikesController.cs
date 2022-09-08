using API.DTOs;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LikesController : BaseApiController
    {
        private readonly ILikesRepository _likesRepository;
        private readonly IUserRepository _userRepositroy;
        public LikesController(IUserRepository userRepositroy, ILikesRepository likesRepository)
        {
            _userRepositroy = userRepositroy;
            _likesRepository = likesRepository;
        }

        [HttpPost("{Username}")]
        public async Task<ActionResult> AddLike(string username) 
        {
            var sourceUserId = User.GetUserId();
            var likedUser = await _userRepositroy.GetUserByUsernameAsync(username);
            var sourceUser = await _likesRepository.GetUserWithLikes(sourceUserId);

            if (likedUser == null) return NotFound();

            if (sourceUser.UserName == username) return BadRequest("You cannot like yourself");

            var userLike = await _likesRepository.GetUserLike(sourceUserId, likedUser.Id);

            if (userLike != null) return BadRequest("You already like this user");

            userLike = new Entities.UserLike 
            {
                SourceUserId = sourceUserId,
                LikedUserId = likedUser.Id
            };

            sourceUser.LikedUsers.Add(userLike);

            if (await _userRepositroy.SaveAllAsync()) return Ok();

            return BadRequest("Failed to like user");
            
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetUserLikes([FromQuery]LikesParams likesParams) 
        {
            likesParams.UserId = User.GetUserId();
            var users = await _likesRepository.GetUserLikes(likesParams);

            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(users);
        }
    }
}