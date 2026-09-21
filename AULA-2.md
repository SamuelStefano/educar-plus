# Aula 2 — fazendo a lista funcionar

Na aula passada você montou a **aparência** da lista: título, campo, botão
"Adicionar" e as tarefas com botão "Remover". Os botões ainda não faziam nada.

Hoje eles vão **funcionar**. Tudo continua em **`src/App.tsx`**.

---

## Não fez a aparência? Comece por aqui

Apague tudo do `src/App.tsx` e digite (não cole!) este ponto de partida:

```tsx
function App() {
  const tasks = ["Estudar React", "Fazer exercício", "Beber água"];

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <h1 className="text-2xl font-bold">Minhas tarefas</h1>

      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 rounded border border-gray-600 bg-gray-900 px-3 py-2"
          placeholder="O que você precisa fazer?"
        />
        <button className="rounded bg-blue-600 px-4 py-2">Adicionar</button>
      </div>

      <ul className="mt-4 space-y-2">
        {tasks.map((task) => (
          <li key={task} className="flex items-center justify-between rounded border border-gray-700 p-3">
            <span>{task}</span>
            <button className="rounded bg-red-600 px-3 py-1 text-sm">Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

Salvou e a tela mostrou título, campo, botão e três tarefas? Pode seguir.

---

## A ideia principal: a tela é uma foto da lista

O React desenha a tela olhando a lista de tarefas. Para a tela mudar, você
**não mexe no HTML**. Você troca a lista, e o React desenha de novo.

Quem avisa o React que a lista trocou é o **`set`** do `useState`.

```txt
clique no botão
      |
      v
setTasks(lista nova)    <- avisa o React
      |
      v
o React desenha a tela de novo
```

> Por isso `tasks.push("nova")` **não funciona**: a lista até muda, mas
> ninguém avisou o React. A tela fica igual.

---

## Passo 1 — a lista vai para o `useState`

Na primeira linha do arquivo:

```tsx
import { useState } from "react";
```

Dentro da função `App`, troque a sua `const tasks = [...]` por:

```tsx
const [tasks, setTasks] = useState(["Estudar React", "Fazer exercício", "Beber água"]);
```

- `tasks` → a lista **de agora**
- `setTasks` → o **único** jeito de trocar a lista

Salve e olhe o navegador: **nada mudou**. Está certo! A lista só mudou de casa.

> ⚠️ O `useState` tem que ficar **dentro** da função `App`, antes do `return`.

---

## Passo 2 — botão Remover

Remover é **fazer uma lista nova sem aquela tarefa**. Quem faz isso é o `filter`.

**2.1** No `.map`, peça também a **posição** (o número) de cada tarefa:

```tsx
{tasks.map((task, index) => (
```

**2.2** Crie a função, dentro do `App` e antes do `return`:

```tsx
function removeTask(index: number) {
  setTasks(tasks.filter((_, i) => i !== index));
}
```

Leia assim: *"guarde só as tarefas cuja posição é **diferente** da que eu cliquei"*.

**2.3** Ligue o botão:

```tsx
<button onClick={() => removeTask(index)}>Remover</button>
```

> ⚠️ Repare no `() =>`. Sem ele, `onClick={removeTask(index)}` roda **na hora
> em que a tela é desenhada**, não no clique.

---

## Passo 3 — botão Adicionar

Precisa de duas coisas: guardar o que está sendo **digitado** e colocar na lista.

**3.1** Um segundo `useState`, para o texto do campo:

```tsx
const [text, setText] = useState("");
```

**3.2** Ligue o campo a ele:

```tsx
<input value={text} onChange={(e) => setText(e.target.value)} />
```

**3.3** Crie a função:

```tsx
function addTask() {
  if (text.trim() === "") return; // campo vazio? não faz nada
  setTasks([...tasks, text]);
  setText(""); // limpa o campo
}
```

- `...tasks` → "coloque aqui tudo o que já estava na lista"
- `text` → a tarefa nova, no fim

**3.4** Ligue o botão:

```tsx
<button onClick={addTask}>Adicionar</button>
```

> Aqui **não** precisa de `() =>`: `addTask` não recebe nada, então você
> entrega a função inteira, sem os parênteses.

---

## Resumo

| Ação | Código | Em português |
|---|---|---|
| Mostrar | `tasks.map(...)` | um `<li>` para cada tarefa |
| Adicionar | `setTasks([...tasks, text])` | a lista de antes, mais a nova |
| Remover | `setTasks(tasks.filter((_, i) => i !== index))` | a lista de antes, sem uma |

**Regra de ouro:** nunca mexa na lista velha. Monte uma **nova** e entregue ao `set`.

---

## Deu erro?

| O que aparece | O que aconteceu | Solução |
|---|---|---|
| Clico e nada acontece | Mudou a lista sem o `set` (ex.: `push`) | Use `setTasks(...)` |
| `useState is not defined` | Faltou o import | `import { useState } from "react";` na linha 1 |
| Tela branca: `Too many re-renders` | `onClick={removeTask(index)}` sem `() =>` | `onClick={() => removeTask(index)}` |
| Remover apaga **todas menos** a clicada | Usou `===` no `filter` | O certo é `!==` |
| Não consigo digitar no campo | Tem `value={text}` mas falta o `onChange` | Passo 3.2 |
| O campo não limpa depois de adicionar | Faltou o `setText("")` | Passo 3.3 |
| Entra tarefa em branco | Faltou o `if (text.trim() === "")` | Passo 3.3 |
| `index is not defined` | Faltou pedir o `index` no `.map` | Passo 2.1 |

---

## Desafios (terminou? continue)

1. **Tarefa repetida.** Adicione "Beber água" duas vezes e abra o console (F12).
   Aparece o aviso do `key`. Por quê? Dica: o `key={task}` usa o texto, e agora
   dois `<li>` têm o mesmo texto.
2. **Contador.** Mostre no título quantas tarefas faltam:
   `Minhas tarefas ({tasks.length})`.
3. **Enter adiciona.** Troque a `<div>` do campo por um `<form>`:
   ```tsx
   <form onSubmit={(e) => { e.preventDefault(); addTask(); }}>
   ```
   e o botão por `<button type="submit">`. Pergunta: o que o
   `e.preventDefault()` impede?

---

## Salvando no GitHub

Cada um na **sua branch**, para ninguém apagar o trabalho do outro:

```bash
git checkout -b seu-nome
git add .
git commit -m "lista de tarefas funcionando"
git push -u origin seu-nome
```

Da segunda vez em diante, basta `git add .`, `git commit -m "..."` e `git push`.
