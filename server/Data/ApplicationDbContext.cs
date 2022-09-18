using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusDetailsSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace BusDetailsSystem.Data;
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }
    public DbSet<BusDetail>? BusDetails { get; set; }
}
