import { useState, useEffect } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";

import './SeeAllTodos.css';

interface Todo {
    id: number;
    todo: string;
    is_complete: boolean;
}

function SeeAllTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [editMode, setEditMode] = useState<number | null>(null);
    const [editedTodo, setEditedTodo] = useState<string>('');
    const [editedIsComplete, setEditedIsComplete] = useState<boolean>(false);
    const [tempEditedTodo, setTempEditedTodo] = useState<string>('');
    const [tempEditedIsComplete, setTempEditedIsCompleted] = useState<boolean>(false);

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

    const handleDelete = async (todoId: number) => {
        try {
            const response = await fetch(`http://localhost:5174/api/Api/${todoId}`, {
                method: 'DELETE',
            });

            if(response.ok) {
                console.log(`Todo ${todoId} deleted.`);
                setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
            } else {
                console.error(`Unable to delete todo ${todoId}`);
            }
        } catch (error) {
            console.error(`Error while attempting to delete Todo ${todoId}:`, error);
        }
    }

    const handleEdit = async (todoId: number) => {
        const todoDTO = {
          id: todoId,
          todo: editedTodo,
          is_complete: editedIsComplete,
        };

        try {
            const response = await fetch(`http://localhost:5174/api/Api/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todoDTO),
            });

            if(response.ok) {
                console.log(`Todo ${todoId} updated successfully.`);
                fetchData();
                setEditMode(null);
            } else {
                console.error(`Failed to update todo ${todoId}.`)
            }
        } catch (error) {
            console.error(`Error when trying to update todo ${todoId}:`, error);
        }
    }

    const handleCancelEdit = () => {
        setEditedTodo(tempEditedTodo);
        setEditedIsComplete(tempEditedIsComplete);

        setTempEditedTodo('');
        setTempEditedIsCompleted(false);

        setEditMode(null);
    }

    return (
        <div className={"todos-container"}>
            {todos.map(todo => (
                <div key={todo.id} className="todoStyling">
                    <h3>ID: {todo.id}</h3>
                    <p>Todo: {todo.todo}</p>
                    <p>Complete: {todo.is_complete ? 'Yes' : 'No'}</p>

                    <div className="aTodo" id="editTodo" onClick={() => setEditMode(todo.id)}>
                        <FontAwesomeIcon icon={faPenToSquare} size="1x" title="Edit Todo"/>
                    </div>
                    <div className="aTodo" id="deleteTodo" onClick={() => handleDelete(todo.id)}>
                        <FontAwesomeIcon icon={faTrashCan} size="1x" title="Delete Todo"/>
                    </div>

                    {editMode === todo.id && (
                        <div>
                            <input
                                type="text"
                                value={editedTodo}
                                onChange={(e) => setEditedTodo(e.target.value)}
                            />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={editedIsComplete}
                                    onChange={(e) => setEditedIsComplete(e.target.checked)}
                                />
                                Mark as Complete
                            </label>
                            <button onClick={() => handleEdit(todo.id)}>Submit</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default SeeAllTodos;
