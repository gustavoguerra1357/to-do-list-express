const express = require("express")
const path = require("node:path")
const fs = require("node:fs")
const router = require("./router")

const app = express()

app.use(express.urlencoded({ extended: true}))
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")))

app.use(router)  



app.listen(3000, () => { 
    console.log("O servidor esta executando em http://localhost:3000/")
})