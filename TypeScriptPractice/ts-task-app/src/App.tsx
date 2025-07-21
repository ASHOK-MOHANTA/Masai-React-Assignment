
import type React from 'react'
import './App.css'
import { useState } from 'react'
import type { Task } from './types/Task'
import { Priority } from './types/Priority'
import TaskItem from './components/TaskItem'

const  App: React.FC = ()=> {
  const [tasks,setTasks] = useState<Task[]>([]);
  const [description,setDescription] = useState("");
  const [priority,setPriority] = useState<Priority>(Priority.Low);

  const addTask =()=>{
    const newTask : Task ={
      id: Date.now(),
      description,
      priority,
      complete:false
    };
    setTasks([...tasks,newTask]);
    setDescription("");
  };

  const toggleTask = (id: number) =>{
    setTasks(tasks.map(task => task.id === id ? {...task,complete: !task.complete} : task));
  };


  return (
    <>
      <h2>Task Manager</h2>
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder='Task..'/>
      <select value={priority} onChange={e => setPriority(e.target.value as Priority)}>
        <option value={Priority.Low}>Low</option>
        <option value={Priority.Medium}>Medium</option>
        <option value={Priority.Hight}>High</option>
      </select>
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task =>(
          <TaskItem key={task.id} task={task} toggleTask={toggleTask}/>
        ))}
      </ul>
    </>
  )
}

export default App
