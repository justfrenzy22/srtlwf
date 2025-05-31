import { useState } from "react";
import type { ITodoItem } from "../types/ITodoItem";
import type { ITodoHooks } from "../types/ITodoHooks";
import type { AttrType } from "../types/AttrType";
import type { IDelegationFunc } from "../types/IDelecationFunc";

export const useTodos = ({
	setTodos,
}: {
	setTodos: React.Dispatch<React.SetStateAction<ITodoItem[]>>;
}): ITodoHooks => {
	const [isLoading, setLoading] = useState<boolean>(false);

	// Helpers
	const parseTodosFromStorage = (): ITodoItem[] => {
		try {
			return JSON.parse(localStorage.getItem("todos") || "[]");
		} catch (err: unknown) {
			if (err instanceof Error) alert(err.message);
			return [];
		}
	};

	const saveTodosToStorage = (todos: ITodoItem[]) => {
		localStorage.setItem("todos", JSON.stringify(todos));
	};

	const withLoading = async (func: () => void) => {
		try {
			setLoading(true);
			await func();
		} catch (err: unknown) {
			if (err instanceof Error) alert(err.message);
		} finally {
			setLoading(false);
		}
	};

	const updateTodos = (todos: ITodoItem[]) => {
		saveTodosToStorage(todos);
		setTodos(todos);
	};

	const handleAddTodo = (
		newTodo: ITodoItem,
		setTodo: React.Dispatch<React.SetStateAction<ITodoItem>>
	): void => {
		withLoading(() => {
			if (!newTodo.content.trim()) {
				alert("Please enter a todo");
				return;
			}
			const todos = parseTodosFromStorage();
			const updatedTodos = [...todos, newTodo];
			saveTodosToStorage(updatedTodos);
			setTodos(updatedTodos);
			setTodo({ content: "", completed: false, id: crypto.randomUUID() });
		});
	};

	const loadTodos = () => {
		withLoading(() => {
			const todos = parseTodosFromStorage();
			setTodos(todos);
		});
	};

	const completeTodo = (todoId: ITodoItem["id"]) => {
		withLoading(() => {
			const todos = parseTodosFromStorage();
			const todo = todos.find((t) => t.id === todoId);
			if (!todo) return alert("Todo not found");

			todo.completed = true;
			updateTodos(todos);
		});
	};

	const activateTodo = (todoId: ITodoItem["id"]) => {
		withLoading(() => {
			const todos = parseTodosFromStorage();
			const todo = todos.find((t) => t.id === todoId);
			if (!todo) return alert("Todo not found");

			todo.completed = false;
			updateTodos(todos);
		});
	};

	const deleteTodo = (todoId: ITodoItem["id"]) => {
		withLoading(() => {
			const todos = parseTodosFromStorage();
			const updatedTodos = todos.filter((t) => t.id !== todoId);
			updateTodos(updatedTodos);
		});
	};

	const filterAll = () => {
		withLoading(() => {
			const todos = parseTodosFromStorage();
			setTodos(todos);
		});
	};

	const filterCompleted = () => {
		withLoading(() => {
			const todos = parseTodosFromStorage();
			setTodos(todos.filter((t) => t.completed));
		});
	};

	const filterActive = () => {
		withLoading(() => {
			const todos = parseTodosFromStorage();
			setTodos(todos.filter((t) => !t.completed));
		});
	};

	const itemHandlers: Partial<Record<AttrType, IDelegationFunc>> = {
		"data-complete-id": completeTodo,
		"data-activate-id": activateTodo,
		"data-delete-id": deleteTodo,
	};

	const filterHandlers: Partial<Record<AttrType, IDelegationFunc>> = {
		"data-filter-all": filterAll,
		"data-filter-active": filterActive,
		"data-filter-completed": filterCompleted,
	};

	const EventDelegation = (
		e: React.MouseEvent<HTMLDivElement>,
		section: "item" | "filter"
	) => {
		const target = e.target as HTMLElement;
		const handlers = section === "item" ? itemHandlers : filterHandlers;

		for (const attr in handlers) {
			const action = target.closest(`[${attr}]`);
			if (action) {
				const handler = handlers[attr as AttrType] as IDelegationFunc;
				const id =
					section === "item"
						? (action.getAttribute(attr) as ITodoItem["id"])
						: undefined;
				if (handler.length === 1 && id !== undefined) {
					(handler as (id: ITodoItem["id"]) => void)(id);
				} else {
					(handler as () => void)();
				}
				break;
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
