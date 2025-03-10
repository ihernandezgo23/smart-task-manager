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

    const handleDelete = (taskId: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id!== taskId));
        console.log(`Task with ID ${taskId} deleted`);
    };

    return (
        
        <div className="p-4 max-w-md mx-auto">
            <div className="flex row">
                <img src="/logo.png" alt="" height={200} width={100}/>
                <h2 className="text-2xl font-semibold mb-6 pt-14 pl-24">Task Manager</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input 
                        type="text" 
                        id="title"
                        name="title" 
                        value={newTask.title} 
                        onChange={handleChange} 
                        placeholder="Enter task title" 
                        required 
                        className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <textarea 
                        id="description"
                        name="description" 
                        value={newTask.description} 
                        onChange={handleChange} 
                        placeholder="Enter task description" 
                        className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex row justify-between">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select 
                            id="category"
                            name="category" 
                            value={newTask.category} 
                            onChange={handleChange} 
                            className="w-50 mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="work">Work</option>
                            <option value="study">Study</option>
                            <option value="personal">Personal</option>
                            <option value="health">Health</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                        <select 
                            id="priority"
                            name="priority" 
                            value={newTask.priority} 
                            onChange={handleChange} 
                            className="w-50 mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
                    <input 
                        type="date" 
                        id="deadline"
                        name="deadline" 
                        value={newTask.deadline ? newTask.deadline.toISOString().split('T')[0] : ''} 
                        onChange={handleChange} 
                        className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white p-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {editingTaskId ? "Update Task" : "Add Task"}
                </button>
            </form>


            <ul className="mt-6 space-y-4">
            {tasks.map((task) => (
                <div 
                    key={task.id} 
                    className={`p-4 border rounded-lg shadow-md ${task.isCompleted ? "bg-green-100" : "bg-white"} transition`}
                >
                    <h3 className="font-semibold text-lg flex justify-between items-center">
                        {task.title} 
                        {task.isCompleted && <span className="text-green-600 text-sm font-medium">(Completed)</span>}
                    </h3>
                    
                    <p className="text-gray-700 mt-1">{task.description}</p>

                    <div className="text-sm text-gray-600 mt-2">
                        <p><strong>Category:</strong> {task.category} | <strong>Priority:</strong> {task.priority}</p>
                        <p><strong>Deadline:</strong> {task.deadline ? new Date(task.deadline).toLocaleDateString() : "No deadline"}</p>
                    </div>

                    <div className="flex space-x-2 mt-3">
                        <button 
                            onClick={() => handleEdit(task)} 
                            className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(task.id)} 
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                        > Delete
                        </button>
                        <button 
                            onClick={() => toggleCompleteTask(task.id)} 
                            className={`px-3 py-1 rounded-md text-white transition ${
                                task.isCompleted ? "bg-gray-500 hover:bg-gray-600" : "bg-green-500 hover:bg-green-600"
                            }`}
                        >
                            {task.isCompleted ? "Mark Incomplete" : "Mark Complete"}
                        </button>
                        
                    </div>
                </div>
                ))}
            </ul>
        </div>
    );
}