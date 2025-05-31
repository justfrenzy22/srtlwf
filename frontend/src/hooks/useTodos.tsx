import { useState } from "react";
import type { ITodoItem } from "../types/ITodoItem";
import type { ITodoHooks } from "../types/ITodoHooks";

export const useTodos = ({
	setTodos,
}: {
	setTodos: React.Dispatch<React.SetStateAction<ITodoItem[]>>;
}): ITodoHooks => {
	// for future use for connecting with backend
	const [isLoading, setLoading] = useState<boolean>(false);

	const handleAddTodo = (
		newTodo: ITodoItem,
		setTodo: React.Dispatch<React.SetStateAction<ITodoItem>>
	): void => {
		// Promise<void>/Response message
		try {
			setLoading(true);

			if (!validateTodo(newTodo)) {
				// error handling or throwing error
				alert("Please enter a todo");
				return;
			}
			SaveToLocalStorage(newTodo);
			// render the new todo
			setTodos((prev) => [...prev, newTodo]);
			// update the state with new details
			setTodo({ content: "", todoStatus: "active", id: crypto.randomUUID() });
		} catch (err: unknown) {
			if (err instanceof Error) alert(err.message);
		} finally {
			setLoading(false);
		}
	};

	const validateTodo = (todo: ITodoItem): boolean => {
		if (todo.content === "") {
			return false;
		}
		return true;
	};

	const SaveToLocalStorage = (newTodo: ITodoItem): void => {
		const todos = JSON.parse(
			localStorage.getItem("todos") || "[]"
		) as ITodoItem[];
		todos.push(newTodo);
		localStorage.setItem("todos", JSON.stringify(todos));
	};

	const getTodos = (): ITodoItem[] => {
		try {
			const todos = JSON.parse(
				localStorage.getItem("todos") || "[]"
			) as ITodoItem[];
			return todos;
		} catch (err: unknown) {
			if (err instanceof Error) {
				alert(err.message);
			}
			return [];
		}
	};

	const loadTodos = () => {
		try {
			setLoading(true);
			const todos = getTodos();
			setTodos(todos);
		} catch (err: unknown) {
			if (err instanceof Error) {
				alert(err.message);
				setTodos([]);
			}
		} finally {
			setLoading(false);
		}
	};

	const updateTodos = (todos: ITodoItem[]) => {
		localStorage.setItem("todos", JSON.stringify(todos));
		setTodos(todos);
	};

	const completeTodo = (todoId: ITodoItem[`id`]) => {
		try {
			setLoading(true);
			// await
			const todos = getTodos();

			if (todos.length < 0) {
				alert("There are no todos to complete");
				return;
			}

			const todo = todos.find((todo) => todo.id === todoId);

			if (!todo) {
				alert("Todo not found");
				return;
			}

			todo.todoStatus = "completed";

			updateTodos(todos);
		} catch (err: unknown) {
			if (err instanceof Error) {
				alert(err.message);
			}
		} finally {
			setLoading(false);
		}
	};

	const deleteTodo = (delTodoId: ITodoItem[`id`]): void => {
		try {
			setLoading(true);
			const todos = getTodos();

			if (todos.length < 0) {
				alert("There are no todos to delete");
				return;
			}

			const todo = todos.find((todo) => todo.id === delTodoId);

			if (!todo) {
				alert("Todo not found");
				return;
			}

			const filteredTodos = todos.filter((todo) => todo.id !== delTodoId);
			updateTodos(filteredTodos);
		} catch (err: unknown) {
			if (err instanceof Error) alert(err.message);
		} finally {
			setLoading(false);
		}
	};

	const EventDelegation = (e: React.MouseEvent<HTMLDivElement>) => {
		const delBtn = (e.target as HTMLElement).closest(`[data-delete-id]`);

		if (delBtn) {
			const id = delBtn.getAttribute(`data-delete-id`);

			if (id) {
				deleteTodo(id as ITodoItem[`id`]);
			}
		}

		const completeBtn = (e.target as HTMLElement).closest(`[data-complete-id]`);

		if (completeBtn) {
			const id = completeBtn.getAttribute(`data-complete-id`);

			if (id) {
				completeTodo(id as ITodoItem[`id`]);
			}
		}
	};

	return {
		isLoading,
		handleAddTodo,
		EventDelegation,
		loadTodos,
	};
};
