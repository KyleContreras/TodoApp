import React, { ChangeEvent, useState } from 'react';

interface EditTodoProps {
    todo: {
        id: number;
        todo: string;
        is_complete: boolean;
    };
    onCloseEdit: () => void;
}

const EditTodo: React.FC<EditTodoProps> = ({ todo, onCloseEdit }) => {
    const [editedTodo, setEditedTodo] = useState({ ...todo });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedTodo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setEditedTodo((prevState) => ({
            ...prevState,
            is_complete: checked,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5174/api/Api/${editedTodo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedTodo),
            });

            if (response.ok) {
                console.log('Update Successful!');
                onCloseEdit();
            } else {
                console.error('Failed to update todo');
            }
        } catch (error) {
            console.error('An error occurred while updating todo:', error);
        }
    };

    return (
        <form className="edit-todo" onSubmit={handleSubmit}>
            <input
                type="text"
                name="todo"
                value={editedTodo.todo}
                onChange={handleInputChange}
                placeholder="Edit Todo"
            />
            <label>
                <input
                    type="checkbox"
                    name="is_complete"
                    checked={editedTodo.is_complete}
                    onChange={handleCheckboxChange}
                />
                Complete
            </label>
            <button type="submit">Submit</button>
            <button type="button" onClick={onCloseEdit}>
                Cancel
            </button>
        </form>
    );
};

export default EditTodo;


/*
import React, { ChangeEvent, useState } from 'react';

import SeeAllTodos from "../SeeAllTodos/SeeAllTodos.tsx";

interface EditTodoProps {
    todo: {
        id: number;
        todo: string;
        is_complete: boolean;
    };
    onCloseEdit: () => void;
}

const EditTodo: React.FC<EditTodoProps> = ({ todo, onCloseEdit }) => {
    const [editedTodo, setEditedTodo] = useState({ ...todo });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedTodo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setEditedTodo((prevState) => ({
            ...prevState,
            is_complete: checked,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5174/api/Api/${editedTodo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedTodo),
            });

            if (response.ok) {
                console.log('Update Successful!');
                onCloseEdit();
            } else {
                console.error('Failed to update todo');
            }
        } catch (error) {
            console.error('An error occurred while updating todo:', error);
        }
    };

    return (
        <form className="edit-todo" onSubmit={handleSubmit}>
            <input
                type="text"
                name="todo"
                value={editedTodo.todo}
                onChange={handleInputChange}
                placeholder="Edit Todo"
            />
            <label>
                <input
                    type="checkbox"
                    name="is_complete"
                    checked={editedTodo.is_complete}
                    onChange={handleCheckboxChange}
                />
                Complete
            </label>
            <button type="submit" onClick={SeeAllTodos}>Submit</button>
            <button type="button" onClick={onCloseEdit}>
                Cancel
            </button>
        </form>
    );
};

export default EditTodo;
*/
