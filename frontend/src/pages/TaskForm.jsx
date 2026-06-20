import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const TaskForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const editTask = location.state;

    const [title, setTitle] = useState(editTask?.title || "");
    const [desc, setDesc] = useState(editTask?.description || "");
    const [status, setStatus] = useState(editTask?.status || "");
    const [priority, setPriority] = useState(editTask?.priority || "");
    const [loading, setLoading] = useState(false);

    const [date, setDate] = useState(
        editTask?.dueDate
            ? editTask.dueDate.split("T")[0]
            : ""
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (editTask) {
                await api.put(`/tasks/${editTask._id}`, {
                    title,
                    description: desc,
                    status,
                    priority,
                    dueDate: date,
                });

                toast.success("Task updated successfully", {
                    position: "bottom-right",
                    theme: "dark",
                });
            } else {
                await api.post("/tasks", {
                    title,
                    description: desc,
                    status,
                    priority,
                    dueDate: date,
                });

                toast.success("Task added successfully", {
                    position: "bottom-right",
                    theme: "dark",
                });

                setTitle("");
                setDesc("");
                setStatus("");
                setPriority("");
                setDate("");
            }

            navigate("/dashboard");
        } catch (e) {
            toast.error(
                e.response?.data?.message || "Task save failed",
                {
                    position: "bottom-right",
                    theme: "dark",
                }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8"
            >
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        {editTask ? "Edit Task" : "Create Task"}
                    </h1>

                    <p className="text-slate-400 mt-2">
                        {editTask
                            ? "Update your task details"
                            : "Add a new task to manage your work"}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">

                    <div>
                        <label className="block mb-2 font-medium text-slate-300">
                            Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Enter task title"
                            className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-slate-300">
                            Status
                        </label>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                            className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        >
                            <option value="">Select Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-slate-300">
                            Priority
                        </label>

                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            required
                            className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        >
                            <option value="">Select Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-slate-300">
                            Due Date
                        </label>

                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                </div>

                <div className="mt-5">
                    <label className="block mb-2 font-medium text-slate-300">
                        Description
                    </label>

                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        rows="5"
                        placeholder="Enter task description..."
                        className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading
                            ? (editTask ? "Updating..." : "Saving...")
                            : (editTask ? "Update Task" : "Add Task")}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    );
};

export default TaskForm;