using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models;

// Bb context class coordinates Entity Framework functionality for a data model.
public class TodoContext : DbContext
{
    public TodoContext(DbContextOptions<TodoContext> options) : base(options) {}

    public DbSet<TodoItem> TodoItems { get; set; } = null!;

}