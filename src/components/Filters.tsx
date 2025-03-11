import { useState, useEffect } from "react";
import { Task } from "../interfaces/interfaces";
import { Link } from "react-router-dom";

export default function MainPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  // LOAD TASKS FROM LOCAL STORAGE
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const loadedTasks: Task[] = JSON.parse(storedTasks);
      console.log("Loaded tasks:", loadedTasks);
      setTasks(loadedTasks);
    }
  }, []);

  // FUNCTION TO APPLY FILTERS (STATUS + CATEGORY + PRIORITY)
  const applyFilters = () => {
    let filtered = tasks;

    if (filterStatus === "completed") {
      filtered = filtered.filter(task => task.isCompleted);
    } else if (filterStatus === "notCompleted") {
      filtered = filtered.filter(task => !task.isCompleted);
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter(task => task.category === filterCategory);
    }

    if (filterPriority !== "all") {
      filtered = filtered.filter(task => task.priority === filterPriority);
    }

    console.log("Filtered tasks:", filtered);
    setFilteredTasks(filtered);
  };

  // EFFECT TO APPLY FILTERS WHEN TASKS, STATUS, CATEGORY, OR PRIORITY CHANGE
  useEffect(() => {
    applyFilters();
  }, [tasks, filterStatus, filterCategory, filterPriority]);

  // HANDLERS
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterPriority(e.target.value);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex row">
        <a href="/">
          <img src="/logo.png" alt="Logo" height={200} width={120} />
        </a>
        <h2 className="text-2xl font-semibold mb-6 pt-14 pl-24">Task Filters</h2>
      </div>

      {/* Navigation */}
      <Link to="/" className="px-4 py-2 bg-gray-600 text-white rounded-lg text-center">
        Go to Main Page
      </Link>

      {/* Filter by Status */}
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

      {/* Filter by Category */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <select
            value={filterCategory}
            onChange={handleCategoryChange}
            className="w-50 p-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Categories</option>
            <option value="personal">Personal Tasks</option>
            <option value="work">Work Tasks</option>
            <option value="study">Study Tasks</option>
            <option value="health">Health Tasks</option>
            <option value="finances">Finances</option>
            <option value="entertainment ">Entertainment </option>
          </select>
          <select
            value={filterPriority}
            onChange={handlePriorityChange}
            className="w-50 p-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      {/* Task List */}
      <ul className="mt-6 space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
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
                <p>
                  <strong>Category:</strong> {task.category} | <strong>Priority:</strong> {task.priority}
                </p>
                <p>
                  <strong>Deadline:</strong> {task.deadline ? new Date(task.deadline).toLocaleDateString() : "No deadline"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No tasks match the filter.</p>
        )}
      </ul>
    </div>
  );
}