import React, { useState } from 'react';

function CreateTodo() {
    const [todo, setTodo] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const newTodo = {
                todo: todo,
                is_complete: isComplete,
            };

            const response = await fetch('http://localhost:5174/api/Api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo),
            });

            if (response.ok) {
                console.log('Todo created successfully!');
            } else {
                console.error('Failed to create todo:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    return (
        <div>
            <h2>Create a Todo</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="todo">
                    Todo:
                    <input
                        type="text"
                        id="todo"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />
                </label>
                <label htmlFor="isComplete">
                    Is Complete:
                    <input
                        type="checkbox"
                        id="isComplete"
                        checked={isComplete}
                        onChange={(e) => setIsComplete(e.target.checked)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateTodo;
