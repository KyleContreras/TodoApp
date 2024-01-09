import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import DeleteTodo from '../DeleteTodo/DeleteTodo';
import EditTodo from '../EditTodo/EditTodo';

import './Todo.css';

interface Todo {

    id: number;
    todo: string;
    is_complete: boolean;
    onDelete: (todoId: number) => void;
}

const Todo: React.FC<{ oneTodo: Todo }> = ({ oneTodo}) => {
    const { id, todo, is_complete } = oneTodo;
    const [isDeleted, setIsDeleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = async () => {
        await DeleteTodo(id, () => setIsDeleted(true));
        setIsDeleted(true);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    if (isDeleted) {
        return null;
    }

    return (
        <div className="todo-item">
            <h3>ID: {id}</h3>
            <p>Todo: {todo}</p>
            <p>Complete: {is_complete ? 'Yes' : 'No'}</p>

            <div className="todo-icons">
                <div className="aTodo" id="editTodo" onClick={handleEditClick}>
                    {/* Trigger EditTodo component when edit icon is clicked */}
                    <FontAwesomeIcon icon={faPenToSquare} size="1x" title="Edit Todo" />
                </div>
                <div className="aTodo" id="deleteTodo" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrashCan} size="1x" title="Delete Todo" />
                </div>
            </div>

            {isEditing && (
                <EditTodo
                    todo={oneTodo}
                    onCloseEdit={() => setIsEditing(false)}
                />
            )}
        </div>
    );
};

export default Todo;
