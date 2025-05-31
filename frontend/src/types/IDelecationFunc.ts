import type { ITodoItem } from "./ITodoItem";

export type IDelegationFunc = ((id: ITodoItem[`id`]) => void) | (() => void);