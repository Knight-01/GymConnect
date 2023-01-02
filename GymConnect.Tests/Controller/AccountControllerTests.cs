using API.Controllers;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Services;
using AutoMapper;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace GymConnect.Tests.Controller
{
    public class AccountControllerTests
    {
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        public AccountControllerTests()
        {
            _tokenService = A.Fake<ITokenService>();
            _mapper = A.Fake<IMapper>();
            _userManager = A.Fake<UserManager<AppUser>>();
            _signInManager = A.Fake<SignInManager<AppUser>>();
        }

        [Fact]
        public void AccountController_Register_ReturnsUserDto()
        {
           //Arrange
           var user = A.Fake<ICollection<AppUser>>();
           var userList = A.Fake<IEnumerable<AppUser>>();
           var registerDto = A.Fake<RegisterDto>();
           A.CallTo(() => _mapper.Map<IEnumerable<AppUser>>(registerDto)).Returns(userList);
           var controller = new AccountController(_userManager, _signInManager, _tokenService, _mapper);

           //Act
           var result = controller.Register(registerDto);

           //Assert
           result.Should().NotBeNull();
           result.Should().BeOfType(typeof(Task<ActionResult<UserDto>>));
        } 

        [Fact]
        public void AccountController_Login_ReturnsUserDto()
        {
            //Arrange
            var loginDto = A.Fake<LoginDto>();
            var user = A.Fake<ICollection<AppUser>>();
            var userList = A.Fake<IEnumerable<AppUser>>();
            A.CallTo(() => _mapper.Map<IEnumerable<AppUser>>(loginDto)).Returns(userList);
            var controller = new AccountController(_userManager, _signInManager, _tokenService, _mapper );
            //Act
            var result = controller.Login(loginDto);

            //Assert
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(Task<ActionResult<UserDto>>));

        }  
    }
}