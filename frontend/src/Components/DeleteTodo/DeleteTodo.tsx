async function DeleteTodo (todoId: number, onDelete: (todoId: number) => void) {
    try {
        const response = await fetch(`http://localhost:5174/api/Api/${todoId}`, {
            method: 'DELETE',
        });

        if(response.ok) {
            console.log(`Todo ${todoId} deleted.`);
            onDelete(todoId);

            return true;
        } else {
            console.error(`Unable to delete todo ${todoId}`);

            return false;
        }
    } catch (error) {
        console.error(`Error while attempting to delete Todo ${todoId}:`, error);

        return false;
    }
}

export default DeleteTodo;
