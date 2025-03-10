import { useState } from "react";
import { Task } from "../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";

export default function MainPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
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
        setNewTask((prevTask) => ({
            ...prevTask,
            [name]: name === "deadline" ? new Date(value) : value
        }));
        console.log(`Changed ${name} to ${value}`);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingTaskId) {
            // Editing an existing task
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === editingTaskId ? { ...task, ...newTask, updatedAt: new Date() } : task
                )
            );
            setEditingTaskId(null);
            console.log("Task edited");
        } else {
            // Adding a new task
            const taskWithId: Task = {
                ...newTask,
                id: uuidv4(),
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            setTasks((prevTasks) => [...prevTasks, taskWithId]);
            console.log("Task added");
        }
        console.log("Form submitted");
        resetForm();
    };

    const resetForm = () => {
        setNewTask({
            title: "",
            description: "",
            category: "personal",
            priority: "medium",
            deadline: null,
            isCompleted: false
        });
        console.log("Form reset");
    };

    const toggleCompleteTask = (taskId: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
            )
        );
    };

    const handleEdit = (task: Task) => {
        setNewTask({ ...task });
        setEditingTaskId(task.id);
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
                <input type="date" name="deadline" value={newTask.deadline ? newTask.deadline.toISOString().split('T')[0] : ''} onChange={handleChange} className="w-full p-2 border" />
                <button type="submit" className="w-full bg-blue-500 text-white p-2">
                    {editingTaskId ? "Update Task" : "Add Task"}
                </button>
            </form>

            <ul className="mt-4">
                {tasks.map((task) => (
                    <div key={task.id} className="border p-2 mt-2">
                        <h3 className="font-bold">
                            {task.title} {task.isCompleted && <span className="text-green-500">(Completed)</span>}
                        </h3>

                        <p>{task.description}</p>
                        <small>Category: {task.category} | Priority: {task.priority}</small><br />
                        <small>Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString() : "No deadline"}</small><br />
                        <div className="flex space-x-2 mt-2">
                            <button onClick={() => toggleCompleteTask(task.id)} className="p-1 bg-green-500 text-white">
                                {task.isCompleted ? "Decomplete" : "Complete"}
                            </button>
                            <button onClick={() => handleEdit(task)} className="p-1 bg-yellow-500 text-white">
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}