import Task from "../models/task.models.js";

export const addTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title || !description || !status || !priority || !dueDate) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (e) {
    res.status(500).json({
      message: "Task creation failed",
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });

    res.status(200).json({
      message: "Tasks fetched successfully",
      tasks,
    });
  } catch (e) {
    res.status(500).json({
      message: "Task fetch failed",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: "Delete task error",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id },
      req.body,
      { new: true },
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (e) {
    res.status(500).json({
      message: "Update task error",
    });
  }
};
