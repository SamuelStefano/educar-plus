# Educar+ — ToDo List

Projeto da turma: uma lista de tarefas em React.

## Como rodar

1. Baixe o projeto:

```bash
git clone https://github.com/SamuelStefano/educar-plus.git
cd educar-plus
```

2. Instale as dependências (só na primeira vez):

```bash
npm install
```

3. Ligue o servidor:

```bash
npm run dev
```

4. Abra no navegador: http://localhost:5173

## Aulas

- Aula 1 — a aparência da lista
- Aula 2 — fazendo a lista funcionar: [`AULA-2.md`](AULA-2.md)
- Aula 3 — marcar como feita e salvar no navegador: [`AULA-3.md`](AULA-3.md)
- Aula 4 — editar tarefas e filtrar a lista: [`AULA-4.md`](AULA-4.md)

## Onde mexer

Tudo acontece em **`src/App.tsx`**. Ele já começa com a lista da aula 3
funcionando. O passo a passo de hoje está no `AULA-4.md`.

## Deu erro?

| Mensagem no terminal | O que aconteceu | Solução |
|---|---|---|
| `no such file or directory, open '.../package.json'` | Terminal na pasta errada | `cd educar-plus` e tente de novo |
| `'vite' is not recognized` / `vite: not found` | Faltou instalar | `npm run install` não existe: rode `npm install` |
| `Port 5173 is in use` | Já tem um `npm run dev` aberto | Feche o outro terminal ou use o link novo que ele mostra |
| Tela branca no navegador | Erro no código | Abra o console (F12) e leia o arquivo e a linha do erro |
| `Each child in a list should have a unique "key" prop` | Faltou o `key` no `.map()` | Adicione `key={...}` no elemento que se repete |
| `class` não funciona | Em React é `className` | Troque `class=` por `className=` |

## Comandos do Git que a gente usa

```bash
git add .
git commit -m "minha lista de tarefas"
git push
```
