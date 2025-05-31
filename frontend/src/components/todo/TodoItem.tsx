import { GripVertical, Trash } from "lucide-react";
import type { ITodoItem } from "../../types/ITodoItem";

const TodoItem = ({ todo }: { todo: ITodoItem }) => {
	return (
		<div className="flex items-center flex-row gap-2 justify-between shadow-lg p-2 text-secondary border-b-1">
			<button>
				<GripVertical size={14} />
			</button>
			{todo.todoStatus === "active" ? (
				<span data-complete-id={todo.id}>{todo.content}</span>
			) : (
				<span className="line-through" data-activate-id={todo.id}>
					{todo.content}
				</span>
			)}
			<button
				className="rounded-full p-2.5 bg-primary cursor-pointer"
				data-delete-id={todo.id}
			>
				<Trash size={14} />
			</button>
		</div>
	);
};

export default TodoItem;
