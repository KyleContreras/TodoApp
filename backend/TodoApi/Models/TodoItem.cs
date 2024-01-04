namespace TodoApi.Models;

public class TodoItem
{
    public int id { get; set; }
    public string? todo { get; set; }
    public bool is_complete { get; set; }
    public string? secret { get; set; }
}