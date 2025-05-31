import type { ITodoHooks } from "../../types/ITodoHooks";

const FilterButtons = ({
	EventDelegation,
}: {
	EventDelegation: ITodoHooks[`EventDelegation`];
}) => {
	return (
		<div
			className="flex flex-row gap-2 bg-foreground p-3 rounded-2xl mb-2"
			onClick={(e) => EventDelegation(e, "filter")}
		>
			<button
				className="btn rounded-lg p-2 bg-foreground text-secondary hover:bg-secondary hover:text-foreground cursor-pointer transition-colors transition-duration-500"
				data-filter-all={`all`}
			>
				All
			</button>
			<button
				className="btn rounded-lg p-2 bg-foreground text-secondary hover:bg-secondary hover:text-foreground cursor-pointer transition-colors transition-duration-500"
				data-filter-active={`active`}
			>
				Active
			</button>
			<button
				className="btn rounded-lg p-2 bg-foreground text-secondary hover:bg-secondary hover:text-foreground cursor-pointer transition-colors transition-duration-500"
				data-filter-completed={`completed`}
			>
				Completed
			</button>
		</div>
	);
};

export default FilterButtons;
