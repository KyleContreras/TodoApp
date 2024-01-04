namespace TodoApi.Models;

// DTO used to prevent:
// Over-posting, hide properties from clients, flatten nested objects

public class TodoItemDTO
{
    public int id { get; set; }
    public string? todo { get; set; }
    public bool is_complete { get; set; }
}