import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            const response = await api.get("/tasks");
            setTasks(response.data.tasks);

        } catch (e) {
            toast.error(
                e.response?.data?.message || "Task fetch failed",
                {
                    position: "bottom-right",
                    theme: "dark",
                }
            );
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/tasks/${id}`);

            toast.success("Task deleted successfully", {
                position: "bottom-right",
                theme: "dark",
            });

            fetchTasks();
        } catch (e) {
            toast.error(
                e.response?.data?.message || "Delete failed",
                {
                    position: "bottom-right",
                    theme: "dark",
                }
            );
        }
    };

    const totalTasks = tasks.length;

    const pendingTasks = tasks.filter((task) => task.status === "Pending").length;

    const completedTasks = tasks.filter((task) => task.status === "Completed").length;

    const filteredTask = tasks.filter((task) => {
        const matchSearch = task.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchFilter =
            filter === "all" ||
            task.status.toLowerCase() === filter ||
            task.priority.toLowerCase() === filter;

        return matchSearch && matchFilter;
    });

    const getTaskBorderColor = (dueDate) => {
        const today = new Date();
        const taskDate = new Date(dueDate);

        today.setHours(0, 0, 0, 0);
        taskDate.setHours(0, 0, 0, 0);

        if (taskDate < today) {
            return "border-red-500";
        }

        if (taskDate.getTime() === today.getTime()) {
            return "border-yellow-500";
        }

        return "border-green-500";
    };

    const getPriorityBadge = (priority) => {
        switch (priority) {
            case "High":
                return "bg-red-500/20 text-red-400";

            case "Medium":
                return "bg-blue-500/20 text-blue-400";

            case "Low":
                return "bg-purple-500/20 text-purple-400";

            default:
                return "bg-slate-700 text-slate-300";
        }
    };

    return (
        <div className="min-h-[calc(100vh-77px)] bg-slate-950 text-white">
            <div className="max-w-7xl mx-auto px-6 py-8">

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        Dashboard
                    </h1>

                    <button
                        onClick={() => navigate("/task-form")}
                        className="bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300"
                    >
                        + Add Task
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
                        <h2 className="text-lg font-semibold">
                            Total Tasks
                        </h2>
                        <p className="text-4xl font-bold mt-3">
                            {totalTasks}
                        </p>
                    </div>

                    <div className="bg-amber-500 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
                        <h2 className="text-lg font-semibold">
                            Pending Tasks
                        </h2>
                        <p className="text-4xl font-bold mt-3">
                            {pendingTasks}
                        </p>
                    </div>

                    <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
                        <h2 className="text-lg font-semibold">
                            Completed Tasks
                        </h2>
                        <p className="text-4xl font-bold mt-3">
                            {completedTasks}
                        </p>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md mb-8">

                    <div className="flex flex-col lg:flex-row gap-4">

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search task..."
                            className="flex-1 bg-slate-800 border border-slate-700 text-white placeholder-slate-400 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="flex flex-wrap gap-2">

                            <button
                                onClick={() => setFilter("all")}
                                className={`px-4 py-2 rounded-lg transition
                                ${filter === "all"
                                        ? "bg-blue-600 text-white"
                                        : "bg-slate-800 text-slate-300"
                                    }`}
                            >
                                All
                            </button>

                            <button
                                onClick={() => setFilter("pending")}
                                className={`px-4 py-2 rounded-lg transition
                                    ${filter === "pending"
                                        ? "bg-yellow-500 text-white"
                                        : "bg-slate-800 text-slate-300"
                                    }`}
                            >
                                Pending
                            </button>

                            <button
                                onClick={() => setFilter("completed")}
                                className={`px-4 py-2 rounded-lg transition
                                    ${filter === "completed"
                                        ? "bg-green-600 text-white"
                                        : "bg-slate-800 text-slate-300"
                                    }`}
                            >
                                Completed
                            </button>
                            <button
                                onClick={() => setFilter("high")}
                                className={`px-4 py-2 rounded-lg transition
                                    ${filter === "high"
                                        ? "bg-red-600 text-white"
                                        : "bg-slate-800 text-slate-300"
                                    }`}
                            >
                                High
                            </button>

                            <button
                                onClick={() => setFilter("medium")}
                                className={`px-4 py-2 rounded-lg transition
                                    ${filter === "medium"
                                        ? "bg-blue-600 text-white"
                                        : "bg-slate-800 text-slate-300"
                                    }`}
                            >
                                Medium
                            </button>

                            <button
                                onClick={() => setFilter("low")}
                                className={`px-4 py-2 rounded-lg transition
                                    ${filter === "low"
                                        ? "bg-purple-600 text-white"
                                        : "bg-slate-800 text-slate-300"
                                    }`}
                            >
                                Low
                            </button>

                        </div>
                    </div>
                </div>

                <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {filteredTask.length > 0 ? (
                        filteredTask.map((task) => (
                            <div
                                key={task._id}
                                className={`bg-slate-900 shadow-lg rounded-2xl p-5 border-l-4 ${getTaskBorderColor(
                                    task.dueDate
                                )} hover:shadow-xl transition`}
                            >
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {task.title}
                                </h3>

                                <p className="text-slate-400 text-sm mb-4">
                                    {task.description}
                                </p>

                                <div className="flex gap-2 mb-4 flex-wrap">

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${task.status === "Completed"
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-yellow-500/20 text-yellow-400"
                                            }`}
                                    >
                                        {task.status}
                                    </span>

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityBadge(
                                            task.priority
                                        )}`}
                                    >
                                        {task.priority}
                                    </span>
                                </div>

                                <p className="text-sm text-slate-400 mb-4">
                                    📅 Due:{" "}
                                    {new Date(
                                        task.dueDate
                                    ).toLocaleDateString()}
                                </p>

                                <div className="flex gap-3">

                                    <button
                                        onClick={() =>
                                            navigate("/task-form", {
                                                state: task,
                                            })
                                        }
                                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(task._id)
                                        }
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                                    >
                                        Delete
                                    </button>

                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-400 text-xl py-10">
                            No tasks found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;