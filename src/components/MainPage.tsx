import { useState } from "react";
import { Task } from "../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";

export default function MainPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<Omit<Task, "id" | "createdAt" | "updatedAt">>({
        title: "",
        description: "",
        category: "personal",
        priority: "medium",
        deadline: null,
        isCompleted: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const taskWithId: Task = {
            ...newTask,
            id: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        setTasks([...tasks, taskWithId]);
        setNewTask({
            title: "",
            description: "",
            category: "personal",
            priority: "medium",
            deadline: null,
            isCompleted: false
        });
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Task Manager</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
                <input type="text" name="title" value={newTask.title} onChange={handleChange} placeholder="Title" required className="w-full p-2 border" />
                <textarea name="description" value={newTask.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border"></textarea>
                <select name="category" value={newTask.category} onChange={handleChange} className="w-full p-2 border">
                    <option value="work">Work</option>
                    <option value="study">Study</option>
                    <option value="personal">Personal</option>
                    <option value="health">Health</option>
                </select>
                <select name="priority" value={newTask.priority} onChange={handleChange} className="w-full p-2 border">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button type="submit" className="w-full bg-blue-500 text-white p-2">Add Task</button>
            </form>
            <ul className="mt-4">
                {tasks.map((task) => (
                    <li key={task.id} className="border p-2 mt-2">
                        <h3 className="font-bold">{task.title}</h3>
                        <p>{task.description}</p>
                        <small>Category: {task.category} | Priority: {task.priority}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}