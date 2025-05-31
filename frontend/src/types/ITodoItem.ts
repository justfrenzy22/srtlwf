import type { UUID } from "crypto";
import type { TodoStatusType } from "./TodoStatusType";

export interface ITodoItem {
    id: UUID;
    content: string;
    todoStatus: TodoStatusType
}