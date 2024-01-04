using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/Api")]
    [ApiController] 
    public class ApiController : ControllerBase
    {
        private readonly TodoContext _context;

        public ApiController(TodoContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItemDTO>>> GetTodoItems()
        {
          return await _context.TodoItems
              .Select(x => ItemToDTO(x))
              .ToListAsync();
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItemDTO>> GetTodoItem(int id) 
        {
            var todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem == null) 
            {
                return NotFound();
            }

            return ItemToDTO(todoItem);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(int id, TodoItemDTO todoDTO)
        {
            if (id != todoDTO.id)
            {
                return BadRequest();
            }

            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem == null) 
            {
                return NotFound();
            }

            todoItem.todo = todoDTO.todo;
            todoItem.is_complete = todoDTO.is_complete;

            _context.Entry(todoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!TodoItemExists(id))
            { 
                return NotFound();
            }

            return NoContent();
        }
        
        [HttpPost]
        public async Task<ActionResult<TodoItemDTO>> PostTodoItem(TodoItemDTO todoDTO) {
            var todoItem = new TodoItem
            {
                is_complete = todoDTO.is_complete,
                todo = todoDTO.todo,
                id = todoDTO.id
            };

            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetTodoItem),
                new { id = todoItem.id },
                ItemToDTO(todoItem));
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem == null) 
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TodoItemExists(int id)
        {
            return _context.TodoItems.Any(e => e.id == id);
        }

        private static TodoItemDTO ItemToDTO(TodoItem todoItem) =>
            new TodoItemDTO
            {
                id = todoItem.id,
                todo = todoItem.todo,
                is_complete = todoItem.is_complete
            };
    }
}
