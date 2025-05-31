import type { ITodoItem } from "./ITodoItem";

export interface ITodoHooks {
	isLoading: boolean;
	handleAddTodo: (
		newTodo: ITodoItem,
		setTodo: React.Dispatch<React.SetStateAction<ITodoItem>>
	) => void;
	EventDelegation: (
		e: React.MouseEvent<HTMLDivElement>,
	) => void;
    loadTodos: () => void
}
