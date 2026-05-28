# Livros Frontend

Frontend Angular para cadastro de livros, autores e assuntos, com tela de relatorio de livros por autor.

## Tecnologias

- Angular 13.3

## Pre-requisitos

- Node.js compativel com Angular 13
- npm
- API backend em execucao

O front consome a API em:

```bash
http://localhost:8080/api
```

## Instalar dependencias

```bash
npm install
```

## Executar 

```bash
ng serve
```

Depois acesse:

```bash
http://localhost:4200/
```

## Funcionalidades

- Listagem, cadastro, edicao e exclusao de livros
- Listagem, cadastro, edicao e exclusao de autores
- Listagem, cadastro, edicao e exclusao de assuntos
- Associacao de livros com autores e assuntos
- Relatorio de livros por autor

## Rotas

| Rota | Descricao |
| --- | --- |
| `/livros` | Lista de livros |
| `/livros/novo` | Cadastro de livro |
| `/livros/:id/editar` | Edicao de livro |
| `/autores` | Lista de autores |
| `/autores/novo` | Cadastro de autor |
| `/autores/:id/editar` | Edicao de autor |
| `/assuntos` | Lista de assuntos |
| `/assuntos/novo` | Cadastro de assunto |
| `/assuntos/:id/editar` | Edicao de assunto |
| `/relatorio` | Relatorio de livros por autor |

## Endpoints esperados

O frontend usa os seguintes recursos da API:

| Recurso | Endpoint base |
| --- | --- |
| Livros | `/api/livros` |
| Autores | `/api/autores` |
| Assuntos | `/api/assuntos` |
| Relatorio | `/api/relatorios/livros-por-autor` |

Para livros, autores e assuntos, a aplicacao usa operacoes CRUD com `GET`, `POST`, `PUT` e `DELETE`.

## Estrutura principal

```text
src/app/app/models      Modelos da aplicacao
src/app/app/services    Servicos HTTP
src/app/app/pages       Paginas de livros, autores, assuntos e relatorio
src/app/app/shared      Componentes compartilhados
```
