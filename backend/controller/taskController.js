const Task = require("../model/taskModel");

const addTask = async (req, res) => {
  try {
    const task = await new Task(req.body).save();
    res.send(task);
  } catch (err) {
    res.send(err);
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (err) {
    res.send(err);
  }
};

const updateTaks = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.send(task);
  } catch (err) {
    res.send(err);
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.send(task);
  } catch (err) {
    res.send(err);
  }
};

module.exports = { addTask, getTasks, updateTaks, deleteTask };
