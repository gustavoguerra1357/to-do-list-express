const fs = require("node:fs").promises;

const path = require("node:path");


class TaskModel {
    static caminho = path.join(__dirname, "..", "database.json")

    static async adicionarTask(newtask) {
        try {
            const tarefas = await this.getTasks();
            tarefas.push(newtask)
            await fs.writeFile(this.caminho, JSON.stringify(tarefas, null, 2));
        } catch (error) {
            console.log("Erro ao adicionar Tarefa")
        }

    }
    static async getTasks() {
        try {
            const dados = await fs.readFile(this.caminho, "utf-8")
            const tarefas = JSON.parse(dados || [])
            return tarefas //retorna o objeto com todas as tarefas
        } catch (error) {
            console.log("Aqui deu erro ao pegar as tarefas")
        } 
    }
}

module.exports = { TaskModel };