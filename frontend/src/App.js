import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const baseUrl = "http://localhost:5000/api/tasks";

  const fetchTodos = async () => {
    try {
      const response = await axios.get(baseUrl);

      setTodos(response.data);
    } catch (err) {
      toast.error("Failed to load tasks..");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTask = async () => {
    if (!newTask) return toast.error("Please enter a task");

    try {
      const response = await axios.post(baseUrl + "/add", { title: newTask });

      setTodos([...todos, response.data]);
      setNewTask("");
      toast.success("Task added successfully!!");
    } catch (err) {
      toast.error("Failed to add task!!");
    }
  };

  const updateTask = async (task) => {
    try {
      const response = await axios.put(`${baseUrl}/${task._id}`, task);
      setTodos(todos.map((t) => (t._id === task._id ? response.data : t)));
      setEditingTaskId(null);
      toast.success("Task updated successfully!");
    } catch (err) {
      toast.error("Failed to update task.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
      toast.success("Task deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete task.");
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>

      <input
        type="text"
        value={newTask}
        onChange={(e) => {
          setNewTask(e.target.value);
        }}
        placeholder="Enter a new task"
      />

      <button onClick={addTask}>Add Task</button>

      <ul>
        {todos.map((task) => (
          <li key={task._id}>
            {editingTaskId === task._id ? (
              <>
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) =>
                    setTodos(
                      todos.map((t) =>
                        t._id === task._id ? { ...t, title: e.target.value } : t
                      )
                    )
                  }
                />
                <button onClick={() => updateTask(task)}>Save</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </span>
                <button onClick={() => setEditingTaskId(task._id)}>Edit</button>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
                <button
                  onClick={() =>
                    updateTask({ ...task, completed: !task.completed })
                  }
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      <ToastContainer />
    </div>
  );
};

export default App;
