import React, { useState, useEffect } from 'react';

import Todo from '../Todo/Todo.tsx';
import './SeeAllTodos.css';

interface TodoItem {
    id: number;
    todo: string;
    is_complete: boolean;
    onDelete: (todoId: number) => void;
}

function SeeAllTodos() {
    const [todos, setTodos] = useState<TodoItem[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5174/api/Api');
            if (response.ok) {
                const data = await response.json();
                setTodos(data);
            } else {
                console.error('Failed to fetch todos');
            }
        } catch (error) {
            console.error('An error occurred while fetching todos:', error);
        }
    };

    return (
        <div className="todos-container">
            {todos.map(todo => (
                <Todo key={todo.id} oneTodo={todo} />
            ))}
        </div>
    );
}

export default SeeAllTodos;
