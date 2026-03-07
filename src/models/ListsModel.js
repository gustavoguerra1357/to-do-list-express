const fs = require("node:fs").promises;
const path = require("node:path");


class ListModel {

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

}

module.exports = { ListModel };