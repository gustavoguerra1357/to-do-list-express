const { TaskModel } = require("../models/TaskModel")
const { ListsModel } = require("../models/ListsModel")

const listsController = {
    getLists: async (req,res) => {
        const listas = await ListsModel.getListas()
        res.send(listas)
    },

    getNames: async (req, res) => {
        const names = await ListsModel.getNomesListas(); //retorna todos os nomes das listas
        res.send(names)
    },
    getListById: async (req, res) => {
        const id = req.params.id;
        try {
            const listaEncontrada = await ListsModel.getListById(id)
            res.json(listaEncontrada)
        } catch (error) {
            res.status(404).send("Lista nao encontrada")
        }
    }
}

module.exports = listsController