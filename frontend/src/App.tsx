// import "./App.css";
import { useEffect, useState } from "react";
import TodoInput from "./components/todo/TodoInput";
import TodoList from "./components/todo/TodoList";
import type { ITodoItem } from "./types/ITodoItem";
import { useTodos } from "./hooks/useTodos";

const App = () => {
	const [todos, setTodos] = useState<ITodoItem[]>([]);

	const { isLoading, handleAddTodo, EventDelegation, loadTodos } = useTodos({
		setTodos,
	});

	useEffect(() => {
		loadTodos();
	}, []);

	return (
		<div>
			<div className="flex min-h-svh flex-col items-center justify-center bg-primary w-screen">
				<div className="flex flex-row gap-2 justify-center items-center w-full">
					<TodoInput isLoading={isLoading} onAddTodo={handleAddTodo} />
					<TodoList EventDelegation={EventDelegation} todos={todos} />
				</div>
			</div>
		</div>
	);
};

export default App;
