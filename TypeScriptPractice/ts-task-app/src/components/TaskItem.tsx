import React from 'react'
import type {Task} from '../types/Task'

interface TaskItemProps{
    task : Task,
    toggleTask: (id: number) => void;
}

const TaskItem : React.FC<TaskItemProps> =  ({task,toggleTask}) => (
    <li>
        <input type='checkbox' checked={task.complete} onChange={()=> toggleTask(task.id)}/>
        {task.description} - <strong>{task.priority}</strong>
    </li>
);

export default TaskItem
