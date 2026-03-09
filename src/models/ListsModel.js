const fs = require("node:fs").promises;
const path = require("node:path");


class ListsModel {

    static caminho = path.join(__dirname, "..", "database.json")

    static async getListas() {
        try {
            const dados = await fs.readFile(this.caminho, "utf-8")
            const listas = JSON.parse(dados || [])
            return listas //retorna um array de objetos com todas as LISTAS de tarefas
        } catch (error) {
            console.log("Erro ao pegar Listas")
        }
    }
    static async getNomesListas() {
        try {
            const listas = await this.getListas();
            const nomes = listas.map((x) => x.nome) //Pego um novo array somente com nomes das listas
            return nomes //retorna um array com os nomes
        } catch (error) {
            console.log("Erro ao consultar os Nomes das Listas")
        }
    }

    static async getListById(id) {
        const listas = await this.getListas()
        const listaEncontrada = listas.find(lista => lista.id == id)
        return listaEncontrada
    }

    static async deletarTarefa(idTarefa, idPai) {
        const listas = await this.getListas(); //pego todas as litas com suas tarefas

        try {
            const listaPai = listas.find(lista => lista.id == idPai) //Pego a lista pai, ou seja, a qual lista a tarefa que vou apagar se refere
            listaPai.tarefas = listaPai.tarefas.filter(tarefa => tarefa.id !== idTarefa)
            await fs.writeFile(this.caminho, JSON.stringify(listas, null, 2));
            console.log("Tarefa apagada com sucesso.")
        } catch (error) {
            console.log("Erro ao deletar a tarefa.")
        }
    }

}

module.exports = { ListsModel };