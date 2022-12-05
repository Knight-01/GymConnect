var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();

// var connString = "";
// if (builder.Environment.IsDevelopment()) 
//     connString = builder.Configuration.GetConnectionString("DefaultConnection");
// else 
// {
// // Use connection string provided at runtime by Heroku.
//         var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

//         // Parse connection URL to connection string for Npgsql
//         connUrl = connUrl.Replace("postgres://", string.Empty);
//         var pgUserPass = connUrl.Split("@")[0];
//         var pgHostPortDb = connUrl.Split("@")[1];
//         var pgHostPort = pgHostPortDb.Split("/")[0];
//         var pgDb = pgHostPortDb.Split("/")[1];
//         var pgUser = pgUserPass.Split(":")[0];
//         var pgPass = pgUserPass.Split(":")[1];
//         var pgHost = pgHostPort.Split(":")[0];
//         var pgPort = pgHostPort.Split(":")[1];

//         connString = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";
// }
// builder.Services.AddDbContext<DataContext>(opt =>
// {
//     opt.UseNpgsql(connString);
// });