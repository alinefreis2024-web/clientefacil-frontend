function cadastrarCliente() {
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const cep = document.getElementById("cep").value;
    const logradouro = document.getElementById("logradouro").value;
    const bairro = document.getElementById("bairro").value;
    const cidade = document.getElementById("cidade").value;
    const uf = document.getElementById("uf").value;

    if (!nome || !telefone || !email) {
        alert("Preencha todos os campos.");
        return;
    }

    fetch("http://127.0.0.1:5000/cliente", {
        method: "POST",
        body: new URLSearchParams({
            nome: nome,
            telefone: telefone,
            email: email,
            cep: cep,
            logradouro: logradouro,
            bairro: bairro,
            cidade: cidade,
            uf: uf
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Não foi possível cadastrar cliente.");
        }
        return response.json();
    })
    .then(data => {
        if (data.mensagem) {
            alert(data.mensagem);
            return;
        }

        alert("Cliente cadastrado com sucesso!");

        document.getElementById("nome").value = "";
        document.getElementById("telefone").value = "";
        document.getElementById("email").value = "";
        document.getElementById("cep").value = "";
        document.getElementById("logradouro").value = "";
        document.getElementById("bairro").value = "";
        document.getElementById("cidade").value = "";
        document.getElementById("uf").value = "";

        listarClientes();
    })
    .catch(error => {
        alert("Erro ao cadastrar cliente.");
        console.error(error);
    });
}


function listarClientes() {
    fetch("http://127.0.0.1:5000/clientes")
    .then(response => {
        if (!response.ok) {
            throw new Error("Não foi possível listar clientes.");
        }
        return response.json();
    })
    .then(data => {
        const lista = document.getElementById("listaClientes");
        lista.innerHTML = "";

        if (!data.clientes || data.clientes.length === 0) {
            lista.innerHTML = "<li>Nenhum cliente cadastrado.</li>";
            return;
        }

        data.clientes.forEach(cliente => {
            const item = document.createElement("li");

            item.innerHTML = `
                <strong>${cliente.nome}</strong><br>
                Telefone: ${cliente.telefone}<br>
                Email: ${cliente.email}<br>
                CEP: ${cliente.cep || ""}<br>
                Endereço: ${cliente.logradouro || ""} ${cliente.bairro || ""} ${cliente.cidade || ""} ${cliente.uf || ""}<br>
                <button onclick="prepararEdicao('${cliente.nome}', '${cliente.telefone}', '${cliente.email}', '${cliente.cep || ""}', '${cliente.logradouro || ""}', '${cliente.bairro || ""}', '${cliente.cidade || ""}', '${cliente.uf || ""}')">
                    Editar
                </button>
                <button class="botao-excluir" onclick="excluirCliente('${cliente.nome}')">
                    Excluir
                </button>
            `;

            lista.appendChild(item);
        });
    })
    .catch(error => {
        alert(error.message);
        console.error(error);
    });
}


function buscarCliente() {
    const nome = document.getElementById("buscaNome").value;

    if (!nome) {
        alert("Digite um nome para buscar.");
        return;
    }

    fetch("http://127.0.0.1:5000/cliente?nome=" + encodeURIComponent(nome))
    .then(response => response.json())
    .then(cliente => {
        const resultado = document.getElementById("resultadoBusca");

        if (cliente.mensagem) {
            resultado.innerHTML = `
                <div class="card-cliente">
                    ${cliente.mensagem}
                </div>
            `;
            return;
        }

        resultado.innerHTML = `
            <div class="card-cliente">
                <strong>${cliente.nome}</strong><br>
                Telefone: ${cliente.telefone}<br>
                Email: ${cliente.email}<br>
                CEP: ${cliente.cep || ""}<br>
                Endereço: ${cliente.logradouro || ""} ${cliente.bairro || ""} ${cliente.cidade || ""} ${cliente.uf || ""}
            </div>
        `;
    })
    .catch(error => {
        alert("Cliente não encontrado.");
        console.error(error);
    });
}


function buscarEndereco() {
    const cep = document.getElementById("cep").value;

    if (!cep) {
        alert("Digite um CEP.");
        return;
    }

    fetch("http://127.0.0.1:5000/endereco?cep=" + encodeURIComponent(cep))
    .then(response => response.json())
    .then(endereco => {
        if (endereco.mensagem) {
            alert(endereco.mensagem);
            return;
        }

        document.getElementById("cep").value = endereco.cep;
        document.getElementById("logradouro").value = endereco.logradouro;
        document.getElementById("bairro").value = endereco.bairro;
        document.getElementById("cidade").value = endereco.cidade;
        document.getElementById("uf").value = endereco.uf;
    })
    .catch(error => {
        alert("Erro ao buscar endereço.");
        console.error(error);
    });
}


function prepararEdicao(nome, telefone, email, cep, logradouro, bairro, cidade, uf) {
    document.getElementById("nome").value = nome;
    document.getElementById("telefone").value = telefone;
    document.getElementById("email").value = email;
    document.getElementById("cep").value = cep;
    document.getElementById("logradouro").value = logradouro;
    document.getElementById("bairro").value = bairro;
    document.getElementById("cidade").value = cidade;
    document.getElementById("uf").value = uf;
}


function atualizarCliente() {
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const cep = document.getElementById("cep").value;
    const logradouro = document.getElementById("logradouro").value;
    const bairro = document.getElementById("bairro").value;
    const cidade = document.getElementById("cidade").value;
    const uf = document.getElementById("uf").value;

    if (!nome || !telefone || !email) {
        alert("Preencha nome, telefone e email.");
        return;
    }

    fetch("http://127.0.0.1:5000/cliente", {
        method: "PUT",
        body: new URLSearchParams({
            nome: nome,
            telefone: telefone,
            email: email,
            cep: cep,
            logradouro: logradouro,
            bairro: bairro,
            cidade: cidade,
            uf: uf
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Não foi possível atualizar cliente.");
        }
        return response.json();
    })
    .then(data => {
        if (data.mensagem) {
            alert(data.mensagem);
            return;
        }

        alert("Cliente atualizado com sucesso.");
        listarClientes();
    })
    .catch(error => {
        alert("Erro ao atualizar cliente.");
        console.error(error);
    });
}


function excluirCliente(nome) {
    fetch("http://127.0.0.1:5000/cliente?nome=" + encodeURIComponent(nome), {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Não foi possível excluir cliente.");
        }
        return response.json();
    })
    .then(data => {
        alert("Cliente excluído com sucesso.");
        listarClientes();
    })
    .catch(error => {
        alert("Erro ao excluir cliente.");
        console.error(error);
    });
}
