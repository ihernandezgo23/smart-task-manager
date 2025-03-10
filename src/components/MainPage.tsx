import { useState, useEffect } from "react";
import { Task } from "../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom"; // Import Link for navigation

export default function MainPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [newTask, setNewTask] = useState<Omit<Task, "id" | "createdAt" | "updatedAt">>({
    title: "",
    description: "",
    category: "personal",
    priority: "medium",
    deadline: null,
    isCompleted: false,
  });

  // Load tasks from localStorage on page load
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: name === "deadline" ? new Date(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTaskId) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTaskId ? { ...task, ...newTask, updatedAt: new Date() } : task
        )
      );
      setEditingTaskId(null);
    } else {
      const taskWithId: Task = {
        ...newTask,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTasks((prevTasks) => [...prevTasks, taskWithId]);
    }
    resetForm();
  };

  const resetForm = () => {
    setNewTask({
      title: "",
      description: "",
      category: "personal",
      priority: "medium",
      deadline: null,
      isCompleted: false,
    });
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
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex row">
        <img src="/logo.png" alt="" height={200} width={100} />
        <h2 className="text-2xl font-semibold mb-6 pt-14 pl-24">Task Manager</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 pt-10">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={newTask.title}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            value={newTask.description}
            onChange={handleChange}
            rows={3}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex space-x-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={newTask.category}
              onChange={handleChange}
              className="w-50 mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="health">Health</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Priority
            </label>
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
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
            Deadline
          </label>
          <input
            id="deadline"
            name="deadline"
            type="date"
            value={newTask.deadline ? newTask.deadline.toISOString().split("T")[0] : ""}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-center space-x-4">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
            {editingTaskId ? "Edit Task" : "Add Task"}
          </button>
          <Link to="/filters" className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Go to Filters Page
          </Link>
        </div>
      </form>

      {/* Task List */}
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
              >
                Delete
              </button>
              <button
                onClick={() => toggleCompleteTask(task.id)}
                className={`px-3 py-1 rounded-md text-white transition ${task.isCompleted ? "bg-gray-500 hover:bg-gray-600" : "bg-green-500 hover:bg-green-600"}`}
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