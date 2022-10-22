using System.Text.RegularExpressions;
using BusDetailsSystem.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();

            // policy.WithOrigins("http://localhost:3000", "https://localhost:3000", "https://busdtl.vercel.app").AllowAnyMethod().AllowAnyHeader();
        }
    );
});

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// builder.Services.AddDbContext<ApplicationDbContext>(o => o.UseNpgsql(builder.Configuration.GetConnectionString("BusDetailsDb")));

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Production")
    {
        var m = Regex.Match(
            Environment.GetEnvironmentVariable("DATABASE_URL")!,
            @"postgres://(.*):(.*)@(.*):(.*)/(.*)"
        );
        options.UseNpgsql(
            $"Server={m.Groups[3]};Port={m.Groups[4]};User Id={m.Groups[1]};Password={m.Groups[2]};Database={m.Groups[5]};sslmode=Prefer;Trust Server Certificate=true"
        );
    }
    else // In Development Environment
    {
        // So, use a local Connection
        options.UseNpgsql(
            builder.Configuration.GetValue<string>(
                builder.Configuration.GetConnectionString("BusDetailsDb")
            )
        );
    }
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
