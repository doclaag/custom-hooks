import { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';

const initialState = [
    // {
    //     id: new Date().getTime(),
    //     description: 'Aprender React',
    //     done: false,
    // },
];

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
};

export const useTodos = () => {

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])


    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] add todo',
            payload: todo,
        };

        dispatch(action);
    };

    const handleDeleteTodo = (id) => {
        const action = {
            type: '[TODO] delete todo',
            payload: id,
        };

        dispatch(action);
    };

    const handleToggleTodo = (id) => {
        const action = {
            type: '[TODO] toggle todo',
            payload: id,
        };

        dispatch(action);
    };



    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length,
        handleDeleteTodo,
        handleToggleTodo,
        handleNewTodo,
    };
}