# Aula 5 — quebrando o app em peças (componentes)

A lista já faz tudo: adicionar, remover, marcar como feita, salvar, editar com
dois cliques e filtrar. Mas repare no `src/App.tsx`: é **um arquivo enorme**,
com tudo misturado. Achar onde mexer já dá trabalho.

Hoje o app **não ganha nenhum botão novo**. Ele vai ficar igualzinho na tela,
só que montado com **peças**:

- `TaskForm` → o campo e o botão "Adicionar"
- `TaskItem` → uma tarefa da lista
- `FilterBar` → o contador e os botões de filtro

> Sua aula 4 não ficou pronta? Sem problema. O `src/App.tsx` da `main` já
> começa com a aula 4 funcionando. Pegue ele com:
> `git checkout main -- src/App.tsx`

---

## Parte 1 — a ideia: peças de LEGO

Pense numa caixa de **LEGO**. Você não esculpe um castelo inteiro de um bloco
só: você junta **peças** pequenas. A mesma peça serve em vários lugares, e se
uma quebra, você troca só ela.

No React, cada peça se chama **componente**. Você já conhece um: o `App`. Um
componente é só uma **função que devolve JSX**.

```txt
App
 ├─ TaskForm            (o campo + Adicionar)
 ├─ TaskItem            (uma tarefa)   ← a mesma peça, uma vez por tarefa
 ├─ TaskItem
 ├─ TaskItem
 └─ FilterBar           (contador + filtros)
```

E como uma peça sabe **o que** mostrar? Pelos **encaixes**. No React, os
encaixes se chamam **props**: são os dados que o pai entrega pro filho.

```tsx
<TaskItem task={task} />
//        └─ prop "task": o pai entrega a ficha, o filho mostra
```

**Teste no console** (F12 → Console). Um componente recebe as props **num
objeto só**:

```js
function Saudacao(props) { return "Olá, " + props.nome; }
Saudacao({ nome: "Ana" })
Saudacao({ nome: "Bia" })
```

A **mesma função** (a mesma peça) mostrou coisas diferentes, porque recebeu
**props** diferentes.

> Tem a extensão **React Developer Tools** no navegador? Abra a aba
> **Components** com o app aberto. Hoje ela mostra só `App`. No fim da aula vai
> mostrar a árvore inteira de peças.

---

## Parte 2 — a ideia: o controle remoto

As props levam dados **do pai pro filho**. Mas e quando o filho precisa
**avisar** o pai? Por exemplo: o `TaskForm` tem o botão "Adicionar", mas a
lista de tarefas mora no `App`.

Pense num **controle remoto**. O botão fica no controle, mas quem muda o canal
é a **TV**. O controle não sabe mudar canal: ele só **avisa**.

```txt
App (a TV)                         TaskForm (o controle)
  guarda a lista                     tem o botão
  sabe adicionar          ◄────────  aperta: onAdd("Beber água")
```

No React, o "botão do controle" é uma **função passada como prop**. O pai
entrega a função, o filho **chama** quando quer avisar:

```tsx
<TaskForm onAdd={addTask} />
```

**Teste no console:**

```js
function controle(aoApertar) { aoApertar("canal 5"); }
controle((canal) => console.log("A TV mudou para o", canal))
```

`controle` não sabe o que a TV faz. Ele só chamou a função que recebeu. Isso é
uma **callback prop**.

> Por convenção, prop que é função de aviso começa com **`on`**: `onAdd`,
> `onToggle`, `onChange`.

---

## Passo 1 — um lugar para os tipos

As peças vão precisar saber o que é uma `Task` e um `Filter`. Crie o arquivo
**`src/types.ts`**:

```ts
export type Task = { id: number; text: string; done: boolean };
export type Filter = "todas" | "ativas" | "feitas";
```

No `App.tsx`, **apague** as duas linhas `type Task` e `type Filter` e importe
de lá:

```tsx
import type { Filter, Task } from "./types";
```

**Teste:** salve. Nada muda na tela. Se o editor mostrar erro vermelho, veja se
o caminho é `./types` (sem `.ts` no fim).

---

## Passo 2 — `FilterBar`: a peça mais simples

Comece pela peça que **só mostra e avisa**, sem guardar nada.

Crie **`src/components/FilterBar.tsx`**:

```tsx
import type { Filter } from "../types";

type FilterBarProps = {
  filter: Filter;
  remaining: number;
  onChange: (filter: Filter) => void;
};

const OPTIONS: Filter[] = ["todas", "ativas", "feitas"];

function FilterBar({ filter, remaining, onChange }: FilterBarProps) {
  return (
    <div className="mt-4 flex items-center gap-2">
      <span className="mr-2 text-sm text-gray-400">{remaining} restantes</span>
      {OPTIONS.map((option) => (
        <button
          key={option}
          className={filter === option ? "font-bold underline" : ""}
          onClick={() => onChange(option)}
        >
          {option[0].toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
```

- `type FilterBarProps` → a **lista de encaixes** da peça: o que ela precisa receber
- `{ filter, remaining, onChange }` → pega cada prop pelo nome (é o mesmo que `props.filter`...)
- `onChange: (filter: Filter) => void` → "uma função que recebe um filtro e não devolve nada"
- os três botões iguais viraram **um `.map`**: a peça ficou menor que o código que ela substitui

No `App.tsx`, importe a peça lá em cima:

```tsx
import FilterBar from "./components/FilterBar";
```

E troque **toda a `<div>` dos filtros** (a do contador e dos três botões) por:

```tsx
<FilterBar filter={filter} remaining={remaining} onChange={setFilter} />
```

**Teste:** clique em "Ativas", "Feitas", "Todas". Funciona igual. Repare no
`onChange={setFilter}`: o `App` entregou o próprio `setFilter` como controle
remoto.

---

## Passo 3 — `TaskForm`: a peça que guarda o próprio texto

O texto que está sendo **digitado** só interessa ao formulário. Então o
`useState` dele **muda de casa**: sai do `App` e vai pra dentro da peça.

Crie **`src/components/TaskForm.tsx`**:

```tsx
import { useState } from "react";

type TaskFormProps = {
  onAdd: (text: string) => void;
};

function TaskForm({ onAdd }: TaskFormProps) {
  const [text, setText] = useState("");

  function submit() {
    if (text.trim() === "") return;
    onAdd(text);
    setText("");
  }

  return (
    <div className="mt-4 flex gap-2">
      <input
        className="rounded bg-white px-2 py-1 text-black"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="rounded bg-white px-3 py-1 text-black" onClick={submit}>
        Adicionar
      </button>
    </div>
  );
}

export default TaskForm;
```

- o `TaskForm` **não sabe** onde a lista mora. Ele só aperta o botão do controle: `onAdd(text)`

No `App.tsx`:

**3.1** Apague o `const [text, setText] = useState("");`.

**3.2** Troque a função `addTask` por esta, que agora **recebe** o texto:

```tsx
function addTask(text: string) {
  setTasks([...tasks, { id: Date.now(), text: text, done: false }]);
}
```

**3.3** Importe e troque a `<div>` do campo + botão por:

```tsx
<TaskForm onAdd={addTask} />
```

**Teste:** adicione uma tarefa. Funciona igual, e o campo limpa sozinho. Quem
limpou foi o `TaskForm`: o `App` nem sabe que existe um campo.

---

## Passo 4 — `TaskItem`: uma tarefa, três avisos

A tarefa tem três ações: marcar, remover e editar. Cada uma vira um **botão do
controle**. E o "estou editando?" também muda de casa: cada tarefa sabe se ela
mesma está em edição.

Crie **`src/components/TaskItem.tsx`**:

```tsx
import { useState } from "react";
import type { Task } from "../types";

type TaskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onRename: (id: number, text: string) => void;
};

function TaskItem({ task, onToggle, onRemove, onRename }: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  function startEdit() {
    setEditText(task.text);
    setEditing(true);
  }

  function saveEdit() {
    if (editText.trim() === "") return;
    onRename(task.id, editText);
    setEditing(false);
  }

  return (
    <li className="flex items-center gap-2">
      <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
      {editing ? (
        <input
          className="rounded bg-white px-2 py-1 text-black"
          value={editText}
          autoFocus
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveEdit();
            if (e.key === "Escape") setEditing(false);
          }}
        />
      ) : (
        <span
          className={task.done ? "text-gray-500 line-through" : ""}
          onDoubleClick={startEdit}
        >
          {task.text}
        </span>
      )}
      <button className="text-red-400" onClick={() => onRemove(task.id)}>
        Remover
      </button>
    </li>
  );
}

export default TaskItem;
```

- `editing` é `true`/`false`: não precisa mais guardar **qual** id está em
  edição, porque cada `TaskItem` cuida só de si
- `onRename(task.id, editText)` → avisa o pai: "a tarefa tal agora se chama assim"

No `App.tsx`:

**4.1** Apague `editingId`, `editText`, `startEdit`, `saveEdit` e `cancelEdit`.

**4.2** Crie a função que troca o texto (o mesmo `map` da aula 4):

```tsx
function renameTask(id: number, text: string) {
  setTasks(tasks.map((task) => (task.id === id ? { ...task, text: text } : task)));
}
```

**4.3** Importe e troque **tudo** o que está dentro do `<ul>` por:

```tsx
{visibleTasks.map((task) => (
  <TaskItem
    key={task.id}
    task={task}
    onToggle={toggleTask}
    onRemove={removeTask}
    onRename={renameTask}
  />
))}
```

> ⚠️ O `key` fica **aqui**, no `.map`, e não dentro do `TaskItem`. Quem precisa
> do `key` é a lista, pra saber qual peça é qual.

**Teste:** marque, remova, dê dois cliques e edite (Enter salva, Esc desiste),
aperte F5. Tudo igual à aula 4.

---

## Passo 5 — olhe o `App` agora

O `return` do `App` ficou mais ou menos assim:

```tsx
<div className="min-h-screen bg-black p-8 text-white">
  <h1 className="text-2xl font-bold">Minhas tarefas</h1>
  <TaskForm onAdd={addTask} />
  <ul className="mt-4 flex flex-col gap-2">
    {visibleTasks.map((task) => (
      <TaskItem key={task.id} task={task} onToggle={toggleTask} onRemove={removeTask} onRename={renameTask} />
    ))}
  </ul>
  <FilterBar filter={filter} remaining={remaining} onChange={setFilter} />
</div>
```

Dá pra **ler** o app como uma frase: título, formulário, lista, filtros.

Repare no que **ficou** no `App`: a lista (`tasks`) e o filtro. Eles ficam no
pai porque **mais de uma peça** precisa deles: a lista é lida pelo `TaskItem` e
pelo `FilterBar` (o contador).

**Teste:** abra a aba **Components** do React DevTools (se tiver). Agora
aparecem `App`, `TaskForm`, vários `TaskItem` e `FilterBar`. Clique num
`TaskItem` e veja as **props** dele do lado direito.

---

## Resumo

| Ideia | Código | Em português |
|---|---|---|
| Componente | `function TaskItem(...) { return <li>...</li>; }` | uma peça: função que devolve JSX |
| Props | `<TaskItem task={task} />` | o pai entrega dados pro filho |
| Tipo das props | `type TaskItemProps = { task: Task; ... }` | a lista de encaixes da peça |
| Callback prop | `<TaskForm onAdd={addTask} />` + `onAdd(text)` | o filho aperta, o pai faz |
| Estado local | `useState` dentro do `TaskForm` | quem usa sozinho, guarda sozinho |
| Estado no pai | `tasks` no `App` | o que várias peças usam fica no pai |

**Regra nova:** o dado mora na peça **mais alta** que precisa dele. Se só uma
peça usa, ele mora nela.

---

## Deu erro?

| O que aparece | O que aconteceu | Solução |
|---|---|---|
| `Cannot find module './components/TaskItem'` | Nome do arquivo ou pasta diferente | O arquivo é `src/components/TaskItem.tsx`, com T e I maiúsculos |
| `... has no default export` | Esqueceu o `export default` no fim da peça | Última linha: `export default TaskItem;` |
| `Property 'onAdd' is missing` | Usou `<TaskForm />` sem a prop | `<TaskForm onAdd={addTask} />` |
| `onAdd is not a function` | Passou o resultado em vez da função: `onAdd={addTask()}` | Sem parênteses: `onAdd={addTask}` |
| Tela mostra `[object Object]` | Mostrou `{task}` em vez de `{task.text}` | Dentro do `TaskItem`: `{task.text}` |
| Aviso do `key` no console | O `key` foi pra dentro do `TaskItem` | O `key` fica no `.map` do `App` |
| Editar muda o texto mas volta ao dar F5 | O `TaskItem` trocou só o próprio `editText` e não avisou o pai | Chame `onRename(task.id, editText)` no `saveEdit` |
| `Cannot find name 'Task'` | Faltou importar o tipo | `import type { Task } from "../types";` |
| `text is not defined` no `App` | Apagou o `useState` do texto mas o `addTask` antigo ainda usa `text` | Use o `addTask(text: string)` do Passo 3.2 |

---

## Desafios (terminou? continue)

1. **Contador sozinho.** Tire o contador do `FilterBar` e faça uma peça
   `TaskCounter` que recebe só `remaining`. Pergunta: o `FilterBar` ainda
   precisa da prop `remaining`?
2. **Limpar feitas.** Crie uma peça `ClearDoneButton` com a prop `onClear`. O
   botão só aparece quando existe tarefa feita. Dica: quem sabe se existe
   tarefa feita? Passe isso como prop também.
3. **Texto do campo.** Dê ao `TaskForm` uma prop opcional `placeholder`
   (`placeholder?: string`) e use `"Nova tarefa..."` quando ela não vier. Dica:
   `function TaskForm({ onAdd, placeholder = "Nova tarefa..." }: TaskFormProps)`.
4. **Pergunta de arquiteto.** Por que o `filter` mora no `App` e não dentro do
   `FilterBar`? Tente mudar de casa e veja o que quebra.

---

## Salvando no GitHub

Na **sua branch** de sempre:

```bash
git add .
git commit -m "app quebrado em componentes"
git push
```
