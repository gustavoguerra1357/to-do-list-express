const listasdiv = document.querySelector("#listas");

function createOption(lista) {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const delete_btn = document.createElement("button");

    p.innerText = lista.nome

    div.classList.add("option-div")
    div.dataset.id = lista.id
    delete_btn.classList.add("delete-btn")

    div.onclick = (e) => {
        abrirLista(lista.id)
    }

    div.append(p, delete_btn)
    listasdiv.append(div)
}

function createTask(task, idPai) {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const delete_btn = document.createElement("button");

    p.innerText = task.nome

    div.classList.add("option-div")
    div.dataset.id = task.id
    div.dataset.idPai = idPai
    delete_btn.classList.add("delete-btn")

    div.onclick = (e) => {
        alert("Aqui vai marcar como concluida")
    }

    delete_btn.onclick = (e) => {
        e.stopPropagation();
        deletarTask(idPai, task.id);
        div.remove()
    }

    div.append(p, delete_btn)
    listasdiv.append(div)

}

async function exibirListas(params) {
    const listas = await (await fetch("/lists")).json(); //retorna um array com todos as listas

    listasdiv.innerHTML = ""
    listas.forEach(lista => {
        createOption(lista)
    })
} 

async function abrirLista(id) {
    const response = await fetch(`/lists/${id}`)
    const listaID = await response.json(); //retorna um a lista especificamente ( objeto)
    listasdiv.innerHTML = ""
    listaID.tarefas.forEach((task) => {
        createTask(task, id)
    })

    const voltar_btn = document.createElement("button");
    voltar_btn.classList.add("primary-button")
    voltar_btn.innerText = "Voltar"
    voltar_btn.onclick = e => {
        exibirListas();
    }
    listasdiv.append(voltar_btn)

}

async function deletarTask(idPai, idTask) {
    const dados = { idPai: idPai, idTask: idTask}
    await fetch("/lists/delete", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // O Express precisa disso para saber como ler o corpo
        },
        body: JSON.stringify(dados) // Transforma o objeto em texto JSON
    })

    abrirLista(idPai)
    
}

async function adicionarTarefa(idPai, idTask) {
    
}

exibirListas();