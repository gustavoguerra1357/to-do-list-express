const express = require("express");
const listsController = require("./controllers/ListsController");

const router = express.Router()



router.get("/lists", listsController.getLists)
router.get("/lists/:id", listsController.getListById)



module.exports = router