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

## Onde mexer

Tudo acontece em **`src/App.tsx`**. Abra esse arquivo no Cursor e leia os
comentários — eles têm as dicas do que fazer.

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
