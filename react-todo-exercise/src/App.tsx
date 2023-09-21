import { useState, FormEvent } from "react";
import { type Todo } from "./types";
import { useLocalStorage } from "./hooks";
import "./App.css";

export default function App() {
    const [todos, setTodos] = useLocalStorage<Todo[]>("TODOS", []);
    const [title, setTitle] = useState("");

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (title.trim() === "") return;

        setTodos((currTodos) => [
            ...currTodos,
            {
                id: crypto.randomUUID(),
                title: title,
                completed: false,
                createdAt: new Date(),
            },
        ]);
        setTitle("");
    }

    function toggleTodoCompleted(id: string) {
        setTodos((currTodos) => {
            const newTodos = currTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                }

                return todo;
            });

            return newTodos;
        });
    }

    function deleteTodo(id: string) {
        setTodos((currTodos) => currTodos.filter((todo) => todo.id !== id));
    }

    function clearCompletedTodos() {
        setTodos((currTodos) => currTodos.filter((todo) => !todo.completed));
    }

    function clearAllTodos() {
        setTodos([]);
    }

    return (
        <main>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                    />
                    <button type="submit">Create</button>
                </form>
                <button type="button" onClick={clearCompletedTodos}>
                    Clear Completed
                </button>
                <button type="button" onClick={clearAllTodos}>
                    Clear All
                </button>
            </div>

            <div className="todos">
                {todos.map((todo) => (
                    <div key={todo.id} className="todo">
                        <label>
                            {todo.title}
                            <input
                                type="checkbox"
                                onChange={() => toggleTodoCompleted(todo.id)}
                                checked={todo.completed}
                            />
                        </label>
                        <button
                            type="button"
                            className="delete-button"
                            onClick={() => deleteTodo(todo.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
}
