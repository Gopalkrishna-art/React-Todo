const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const connectDB = require("./config/db");
const taskRouter = require("./routes/taskRoutes");

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
