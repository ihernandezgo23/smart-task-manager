import { useState, useEffect } from "react";
import { Task } from "../interfaces/interfaces";
import { Link } from "react-router-dom";

export default function Stats() {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Load tasks from localStorage on page load
    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
        const loadedTasks: Task[] = JSON.parse(storedTasks);
        setTasks(loadedTasks);
        }
    }, []);

    // Filter tasks based on some criteria (e.g., completed tasks)
    const completedTasks = tasks.filter(task => task.isCompleted);
    const incompleteTasks = tasks.filter(task => !task.isCompleted);

    // Count tasks by priority
    const priorityCount = tasks.reduce((acc, task) => {
        acc[task.priority]++;
        return acc;
    }, { low: 0, medium: 0, high: 0 });

    // Upcoming tasks based on deadline (filter for tasks in the future)
    const upcomingTasks = tasks.filter(task => {
        const deadlineDate = task.deadline ? new Date(task.deadline) : null;
        return deadlineDate && deadlineDate > new Date();
    });

    // Task statistics
    const totalTasks = tasks.length;
    const totalCompleted = completedTasks.length;
    const totalIncomplete = incompleteTasks.length;

    return (
        <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
                <a href="/" className="mr-4">
                <img src="/logo.png" alt="Logo" height={200} width={120} />
                </a>
                <h2 className="text-3xl ml-53 font-semibold text-gray-700">Task Stats</h2>
            </div>

            {/* Navigation */}
            <Link to="/" className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-800 transition duration-300 block text-center mb-6">
                Go to Main Page
            </Link>

            {/* Statistics Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Statistics</h3>
                <p className="text-lg text-gray-700 mb-2">Total Tasks: <span className="font-bold">{totalTasks}</span></p>
                <p className="text-lg text-gray-700 mb-2">Completed Tasks: <span className="font-bold text-green-600">{totalCompleted}</span></p>
                <p className="text-lg text-gray-700 mb-2">Incomplete Tasks: <span className="font-bold text-red-600">{totalIncomplete}</span></p>
                <p className="text-lg text-gray-700 mb-2">Tasks by Priority:</p>
                <ul className="list-disc pl-5 text-gray-700">
                <li className="text-green-500">Low: {priorityCount.low}</li>
                <li className="text-orange-400">Medium: {priorityCount.medium}</li>
                <li className="text-red-400">High: {priorityCount.high}</li>
                </ul>
            </div>

            {/* Upcoming Tasks Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Tasks</h3>
                {upcomingTasks.length > 0 ? (
                <ul className="list-disc pl-5 text-gray-700">
                    {upcomingTasks.map(task => (
                    <li key={task.id} className="mb-2">{task.title} - <span className="text-blue-600">{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline'}</span></li>
                    ))}
                </ul>
                ) : (
                <p className="text-gray-600">No upcoming tasks.</p>
                )}
            </div>
        </div>
    );
}