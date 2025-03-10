import { useState, useEffect } from "react";
import { Task } from "../interfaces/interfaces";
import { Link } from "react-router-dom";

export default function MainPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]); // State for filtered tasks

  const [filterStatus, setFilterStatus] = useState("all"); // New filter for task status (all/completed/not completed)

  // Load tasks from localStorage on page load
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const loadedTasks: Task[] = JSON.parse(storedTasks);
      setTasks(loadedTasks);
      applyFilters(loadedTasks); // Apply filters after loading tasks
    }
    console.log(storedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Apply filter based on task completion status
  const applyFilters = (tasksToFilter: Task[]) => {
    let filtered: Task[];
    console.log("Applying filter:", filterStatus);
    if (filterStatus === "completed") {
      filtered = tasksToFilter.filter(task => task.isCompleted);
      console.log("Completed tasks:", filtered);
    } else if (filterStatus === "notCompleted") {
      filtered = tasksToFilter.filter(task => !task.isCompleted);
      console.log("Not completed tasks:", filtered);
    } else {
      filtered = tasksToFilter; // No filter applied
    }
    setFilteredTasks(filtered);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setFilterStatus(newStatus);
    applyFilters(tasks); // Apply filter after status change
  };

  // Apply filter whenever tasks or filterStatus change
  useEffect(() => {
    applyFilters(tasks); // Reapply filter whenever tasks or filterStatus changes
  }, [tasks, filterStatus]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex row">
        <img src="/logo.png" alt="" height={200} width={100} />
        <h2 className="text-2xl font-semibold mb-6 pt-14 pl-24">Task Manager</h2>
      </div>

      {/* Navigation */}
      <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-md">
        Go to Main page
      </Link>

      {/* Filter Controls */}
      <div className="space-y-4 mb-6 pt-10">
        <div>
          <label className="block font-medium text-gray-700">Filter by Status</label>
          <select
            value={filterStatus}
            onChange={handleStatusChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed Tasks</option>
            <option value="notCompleted">Not Completed Tasks</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <ul className="mt-6 space-y-4">
        {filteredTasks.length > 0 ? filteredTasks.map((task) => (
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
          </div>
        )) : (
          <p className="text-center text-gray-600">No tasks match the filter.</p>
        )}
      </ul>


      
    </div>
  );
}