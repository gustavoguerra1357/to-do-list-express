const express = require("express");
const taskController = require("./controllers/TaskController");

const router = express.Router()

//Rotas
router.post("/tasks", taskController.addTask);



module.exports = router