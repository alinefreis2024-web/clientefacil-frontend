# ClienteFácil Front-end

Front-end desenvolvido para o Sprint II do MVP da disciplina Desenvolvimento Full Stack do MBA PUC-Rio.

## Sobre o projeto

O ClienteFácil é um sistema para ajudar profissionais autônomos a organizar os dados dos seus clientes.

Esta interface permite cadastrar, listar, buscar, atualizar e excluir clientes. Também permite informar um CEP e buscar o endereço pela API ClienteFácil, que consulta a API externa ViaCEP.

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- Docker

## Como executar localmente

Abra o arquivo `index.html` diretamente no navegador.

Antes de usar a interface, a API ClienteFácil deve estar em execução em:

<http://127.0.0.1:5000>

## Como executar com Docker

1. Construir a imagem:

```bash
docker build -t clientefacil-frontend .
```

2. Executar o container:

```bash
docker run -p 8080:80 clientefacil-frontend
```

3. Acessar no navegador:

<http://127.0.0.1:8080>

## Comunicação com a API

O front-end faz chamadas para a API ClienteFácil usando os métodos:

- `GET`
- `POST`
- `PUT`
- `DELETE`

## Arquitetura

```text
Usuário
  |
  v
Front-end ClienteFácil
  |
  v
API ClienteFácil
  |
  v
Banco SQLite

API ClienteFácil
  |
  v
API externa ViaCEP
```

## Autor

Desenvolvido por **Aline Ferreira dos Reis**.
