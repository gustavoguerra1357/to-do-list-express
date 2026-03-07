const { TaskModel } = require("../models/TaskModel")

const taskController = {

    //GET /tasks
    addTask: async (req, res) => {
        try {
            const newTask = {
                id: Date.now().toString(),
                name: req.body.name
            }
            await TaskModel.adicionarTask(newTask);
            res.redirect("/")
            console.log("Tarefa Adicionada com Sucesso!")
        } catch (error) {
            res.send("Erro ao adicionar Tarefa")
        }
    }
}

module.exports = taskController