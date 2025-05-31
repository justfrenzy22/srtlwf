import type { ITodoHooks } from "../../types/ITodoHooks";
import type { ITodoItem } from "../../types/ITodoItem";
import TodoItem from "./TodoItem";

const TodoList = ({
	todos,
	EventDelegation,
}: {
	todos: ITodoItem[];
	EventDelegation: ITodoHooks[`EventDelegation`];
}) => {
	return (
		<div
			className="bg-foreground p-4 rounded-lg flex flex-col gap-3 min-w-[300px]"
			onClick={EventDelegation}
		>
			{todos.length === 0 ? (
				<p className="text-secondary">There are no todos</p>
			) : (
				<>
					{todos.map((todo) => (
						<TodoItem key={todo.id} todo={todo} />
					))}
				</>
			)}
		</div>
	);
};

export default TodoList;
