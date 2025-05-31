import { Plus } from "lucide-react";
import { useState } from "react";
import type { ITodoItem } from "../../types/ITodoItem";
import Loader from "../custom/loader";
import type { ITodoHooks } from "../../types/ITodoHooks";

const TodoInput = ({
	isLoading,
	onAddTodo,
}: {
	isLoading: ITodoHooks[`isLoading`];
	onAddTodo: ITodoHooks[`handleAddTodo`];
}) => {
	const [todo, setTodo] = useState<ITodoItem>({
		content: "",
		completed: false,
		id: crypto.randomUUID(),
	});

	return (
		<div className="flex flex-row gap-2 justify-center items-center bg-secondary/40 rounded-lg p-2 max-h-[55px] ">
			<input
				type="text"
				className=" p-2 rounded-lg bg-secondary/20 text-secondary h-[40px]"
				placeholder="What needs to be done?"
				value={todo.content}
				disabled={isLoading}
				onChange={(e) => setTodo({ ...todo, content: e.target.value })}
			/>
			{isLoading ? (
				<Loader />
			) : (
				<button
					className="rounded-full p-1.5 bg-primary/40 cursor-pointer"
					onClick={() => onAddTodo(todo, setTodo)}
				>
					<Plus size={18} className="text-secondary" />
				</button>
			)}
		</div>
	);
};

export default TodoInput;
