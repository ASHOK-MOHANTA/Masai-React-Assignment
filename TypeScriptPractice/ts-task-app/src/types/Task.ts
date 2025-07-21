import { Priority } from "./Priority";

export interface Task{
    id:number,
    description :string,
    priority: Priority,
    complete: boolean;
}