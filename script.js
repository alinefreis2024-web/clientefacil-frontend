function cadastrarCliente() {
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;

    if (!nome || !telefone || !email) {
        alert("Preencha todos os campos.");
        return;
    }

    fetch("http://127.0.0.1:5000/cliente", {
        method: "POST",
        body: new URLSearchParams({
            nome: nome,
            telefone: telefone,
            email: email
        })
    })
    .then(response => response.json())
    .then(data => {
        alert("Cliente cadastrado com sucesso!");

        document.getElementById("nome").value = "";
        document.getElementById("telefone").value = "";
        document.getElementById("email").value = "";

        listarClientes();
    })
    .catch(error => {
        alert("Erro ao cadastrar cliente.");
        console.error(error);
    });
}


function listarClientes() {
    fetch("http://127.0.0.1:5000/clientes")
    .then(response => response.json())
    .then(data => {
        const lista = document.getElementById("listaClientes");
        lista.innerHTML = "";

        data.clientes.forEach(cliente => {
            const item = document.createElement("li");

            item.innerHTML = `
                <strong>${cliente.nome}</strong><br>
                Telefone: ${cliente.telefone}<br>
                Email: ${cliente.email}<br>
                <button class="botao-excluir" onclick="excluirCliente('${cliente.nome}')">
                    Excluir
                </button>
            `;

            lista.appendChild(item);
        });
    })
    .catch(error => {
        alert("Erro ao listar clientes.");
        console.error(error);
    });
}


function buscarCliente() {
    const nome = document.getElementById("buscaNome").value;

    if (!nome) {
        alert("Digite um nome para buscar.");
        return;
    }

    fetch("http://127.0.0.1:5000/cliente?nome=" + nome)
    .then(response => response.json())
    .then(cliente => {
        const resultado = document.getElementById("resultadoBusca");

        resultado.innerHTML = `
            <div class="card-cliente">
                <strong>${cliente.nome}</strong><br>
                Telefone: ${cliente.telefone}<br>
                Email: ${cliente.email}
            </div>
        `;
    })
    .catch(error => {
        alert("Cliente não encontrado.");
        console.error(error);
    });
}


function excluirCliente(nome) {
    fetch("http://127.0.0.1:5000/cliente?nome=" + nome, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        alert("Cliente excluído com sucesso.");
        listarClientes();
    })
    .catch(error => {
        alert("Erro ao excluir cliente.");
        console.error(error);
    });
}