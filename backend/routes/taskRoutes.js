const express = require("express");
const router = express.Router();
const {
  addTask,
  getTasks,
  updateTaks,
  deleteTask,
} = require("../controller/taskController");

router.post("/add", addTask);

router.get("/", getTasks);

router.put("/:id", updateTaks);

router.delete("/:id", deleteTask);

module.exports = router;
