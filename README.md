# ClienteFácil Front-end

Front-end desenvolvido para o MVP do Sprint II da pós-graduação em Desenvolvimento Full Stack da PUC-Rio.

## Sobre o projeto

O ClienteFácil é uma aplicação simples para ajudar profissionais autônomos a organizar os dados dos seus clientes.

Esta tela foi feita em HTML, CSS e JavaScript, seguindo a proposta trabalhada nas aulas. Por ela é possível cadastrar, listar, buscar, editar e excluir clientes.

No cadastro também existe um campo de CEP. Ao clicar em buscar endereço, o front-end chama a API ClienteFácil, e a API consulta o ViaCEP.

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- Docker

## Execução local

Abra o arquivo `index.html` diretamente no navegador.

Para as chamadas funcionarem, a API precisa estar rodando em:

<http://127.0.0.1:5000>

## Execução com Docker

Na pasta do front-end, execute:

```bash
docker build -t clientefacil-frontend .
```

Depois rode o container:

```bash
docker run -p 8080:80 clientefacil-frontend
```

A interface ficará disponível em:

<http://127.0.0.1:8080>

## Integração com a API

O front-end chama a API ClienteFácil em `http://127.0.0.1:5000`.

As ações da tela usam os métodos pedidos no Sprint II:

- `GET`
- `POST`
- `PUT`
- `DELETE`

## Cenário adotado

O projeto usa o cenário com front-end, API própria e API externa. O usuário interage com esta interface, a interface chama a API ClienteFácil, e a API salva os dados no SQLite. Para buscar endereço pelo CEP, a API ClienteFácil consulta o ViaCEP.

## Autor

Desenvolvido por **Aline Ferreira dos Reis**.
