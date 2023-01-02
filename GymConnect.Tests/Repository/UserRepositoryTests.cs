using API.Data;
using API.Entities;
using AutoMapper;
using FakeItEasy;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace GymConnect.Tests.Repository
{
    public class UserRepositoryTests
    {
        private async Task<DataContext> GetDatabaseContext()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            var databaseContext = new DataContext(options);
            databaseContext.Database.EnsureCreated();
            if (await databaseContext.Users.CountAsync() <= 0)
            {
                for (int i = 0; i < 10; i++)
                {
                    databaseContext.Users.Add(
                        new AppUser
                        {
                            KnownAs = "Escobar",
                            DateOfBirth = new DateTime(1990, 1, 1),
                            Gender = "Male",
                            Created = DateTime.Now,
                            Country = "Australia",
                            City = "Adelaide",
                            LastActive = DateTime.Now
                        }
                    );
                    await databaseContext.SaveChangesAsync();
                }
            }
            return databaseContext;
        }
        [Fact]
        public async void UserRepository_GetUser_ReturnsAppUser()
        {
            //Arrange
            var id = 1;
            var _mapper = A.Fake<IMapper>();
            var dbContext = await GetDatabaseContext();
            var userList = A.Fake<IEnumerable<AppUser>>();
            A.CallTo(() => _mapper.Map<IEnumerable<AppUser>>(dbContext)).Returns(userList);
            var userRepository = new UserRepository(dbContext, _mapper);


            //Act
            var result = await userRepository.GetUserByIdAsync(id);

            //Assert
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(AppUser));
        }

    }
}