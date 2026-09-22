# Aula 3 — marcar como feita e não perder nada

Na aula passada a lista ganhou vida: dá para **adicionar** e **remover**.
Mas ainda faltam duas coisas que todo app de tarefas tem:

- marcar uma tarefa como **feita** (sem apagar)
- a lista **continuar lá** quando você aperta F5

Tudo continua em **`src/App.tsx`**.

> Sua aula 2 não ficou pronta? Sem problema. O `src/App.tsx` da `main` já
> começa com a aula 2 funcionando. Pegue ele com:
> `git checkout main -- src/App.tsx`

---

## A ideia principal: a tarefa vira uma ficha

Até agora, cada tarefa era **só um texto**: `"Beber água"`.

Texto não tem onde guardar "já fiz" ou "ainda não fiz". Pense numa ficha de
personagem de game: ela não tem só o nome, tem **vários campos**.

```txt
antes (texto)          agora (ficha = objeto)
                       ┌──────────────────────────┐
"Beber água"           │ id:   1                  │  <- número único
                       │ text: "Beber água"       │  <- o que aparece na tela
                       │ done: false              │  <- já fiz? sim/não
                       └──────────────────────────┘
```

Em JavaScript, uma ficha assim se chama **objeto** e se escreve com `{ }`:

```tsx
{ id: 1, text: "Beber água", done: false }
```

**Teste antes de mexer no app.** Abra o console do navegador (F12 → Console)
e digite, uma linha por vez:

```js
const tarefa = { id: 1, text: "Beber água", done: false };
tarefa.text
tarefa.done
```

Viu? O **ponto** (`.`) abre a ficha e pega um campo.

---

## Passo 1 — as tarefas viram fichas

**1.1** Em cima da função `App` (fora dela), diga ao TypeScript como é uma ficha:

```tsx
type Task = { id: number; text: string; done: boolean };
```

**1.2** Troque o `useState` das tarefas:

```tsx
const [tasks, setTasks] = useState<Task[]>([
  { id: 1, text: "Estudar React", done: false },
  { id: 2, text: "Fazer exercício", done: false },
  { id: 3, text: "Beber água", done: true },
]);
```

- `Task[]` → "uma lista de fichas"

**1.3** Agora a tela quebra, porque o `.map` ainda acha que `task` é texto.
Troque o `<li>`:

```tsx
{tasks.map((task) => (
  <li key={task.id} className="flex items-center gap-2">
    <span>{task.text}</span>
    <button className="text-red-400" onClick={() => removeTask(task.id)}>
      Remover
    </button>
  </li>
))}
```

- `key={task.id}` → o `key` agora é o número, que **nunca repete**
- `removeTask(task.id)` → remove pelo número, não pela posição

**1.4** Ajuste as duas funções:

```tsx
function addTask() {
  if (text.trim() === "") return;
  setTasks([...tasks, { id: Date.now(), text: text, done: false }]);
  setText("");
}

function removeTask(id: number) {
  setTasks(tasks.filter((task) => task.id !== id));
}
```

- `Date.now()` → o relógio em milissegundos. Nunca dá o mesmo número duas
  vezes seguidas, então serve de `id`.

**Teste:** adicione "Beber água" **duas vezes** e abra o console. O aviso
vermelho do `key` (desafio 1 da aula 2) **sumiu**. Por quê? Cada ficha tem o
seu `id`, mesmo com o texto igual.

> ⚠️ `task.text`, não `task`. Se aparecer `Objects are not valid as a React
> child`, você está tentando mostrar a ficha inteira na tela.

---

## Passo 2 — marcar como feita

Pense num **interruptor de luz**: cada clique inverte. Acesa vira apagada,
apagada vira acesa.

```txt
done: false  --clique-->  done: true  --clique-->  done: false
```

Em código, "inverter" é o `!`:

```js
!false   // true
!true    // false
```

**Teste no console:** digite `!false` e depois `!true`.

Agora a regra de ouro da aula 2 continua valendo: **não mexa na ficha velha**.
Monte uma lista nova, igual à antiga, com **só uma ficha trocada**. Quem faz
isso é o `map`:

```txt
lista velha                lista nova
 id 1  done: false   --->   id 1  done: false   (copiou igual)
 id 2  done: false   --->   id 2  done: TRUE    (a clicada: inverteu)
 id 3  done: true    --->   id 3  done: true    (copiou igual)
```

**2.1** Crie a função, dentro do `App` e antes do `return`:

```tsx
function toggleTask(id: number) {
  setTasks(
    tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
  );
}
```

Leia assim: *"para cada ficha: se é a clicada, faça uma cópia com o `done`
invertido; se não é, devolva ela mesma"*.

- `{ ...task, done: ... }` → "copie todos os campos da ficha, mas troque o `done`"
- `? :` → um `if/else` de uma linha só

**2.2** Coloque uma caixinha de marcar no começo do `<li>`:

```tsx
<input
  type="checkbox"
  checked={task.done}
  onChange={() => toggleTask(task.id)}
/>
```

**2.3** Risque o texto quando estiver feita:

```tsx
<span className={task.done ? "text-gray-500 line-through" : ""}>{task.text}</span>
```

**Teste:** clique na caixinha de "Estudar React". O texto fica riscado.
Clique de novo: volta ao normal.

> ⚠️ É `===` aqui (achar a clicada), diferente do `!==` do Remover
> (guardar todas **menos** a clicada).

---

## Passo 3 — salvar no navegador

Aperte **F5** agora. Suas tarefas novas **sumiram**.

É como um game **sem save**: você fecha e perde o progresso. O `useState`
guarda a lista na **memória**, e o F5 limpa a memória.

O navegador tem uma gaveta que **não** limpa no F5: o **`localStorage`**.

```txt
useState       -> memória: some no F5
localStorage   -> gaveta do navegador: fica lá até você apagar
```

A gaveta só guarda **texto**. Por isso a lista vira texto para entrar
(`JSON.stringify`) e volta a ser lista para sair (`JSON.parse`).

**Teste no console:**

```js
localStorage.setItem("teste", "oi");
localStorage.getItem("teste")
```

Agora aperte F5 e rode só a segunda linha de novo. O `"oi"` **continua lá**.

Para ver a gaveta com os olhos: F12 → aba **Application** → **Local Storage**
→ `http://localhost:5173`.

```txt
┌ Application ─────────────────────────────────────────────┐
│ Local Storage                                            │
│  └ http://localhost:5173     Key     │ Value             │
│                              teste   │ oi                │
└──────────────────────────────────────────────────────────┘
```

**3.1** Troque a primeira linha do arquivo:

```tsx
import { useEffect, useState } from "react";
```

**3.2** Crie uma função **fora** do `App`, logo abaixo do `type Task`, que
abre a gaveta:

```tsx
function loadTasks(): Task[] {
  const saved = localStorage.getItem("tasks");
  if (saved === null) {
    return [{ id: 1, text: "Estudar React", done: false }];
  }
  return JSON.parse(saved);
}
```

- gaveta vazia (primeira vez)? → começa com uma tarefa de exemplo
- tem algo lá? → transforma o texto de volta em lista

**3.3** O `useState` começa com o que estava na gaveta:

```tsx
const [tasks, setTasks] = useState<Task[]>(loadTasks);
```

> Repare: `loadTasks` **sem** os parênteses, igual ao `onClick={addTask}` da
> aula 2. Você entrega a função, e o React chama só **uma vez**, quando o app abre.

**3.4** Toda vez que a lista mudar, guarde na gaveta. Dentro do `App`, logo
abaixo dos `useState`:

```tsx
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);
```

- `[tasks]` → "rode isso de novo **sempre que `tasks` mudar**"

**Teste:** adicione uma tarefa, marque outra como feita e aperte **F5**.
Tudo continua lá. Abra a aba **Application** e veja a chave `tasks` com a
sua lista em texto.

---

## Resumo

| Ação | Código | Em português |
|---|---|---|
| Ficha | `{ id, text, done }` | uma tarefa com vários campos |
| Marcar | `tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))` | a lista de antes, com uma ficha invertida |
| Salvar | `localStorage.setItem("tasks", JSON.stringify(tasks))` | lista vira texto e vai para a gaveta |
| Carregar | `JSON.parse(saved)` | texto da gaveta vira lista de novo |

**Regra de ouro (continua):** nunca mexa na lista velha. Monte uma **nova** e
entregue ao `set`.

---

## Deu erro?

| O que aparece | O que aconteceu | Solução |
|---|---|---|
| `Objects are not valid as a React child` | Mostrou `{task}` em vez de `{task.text}` | Passo 1.3 |
| `Property 'text' does not exist on type 'string'` | O `useState` ainda tem a lista de textos | Passo 1.2 |
| `Cannot find name 'Task'` | Faltou o `type Task` | Passo 1.1, fora da função `App` |
| Marcar uma marca **todas** | Usou `!==` no `toggleTask` | O certo é `===` |
| A caixinha não muda | Tem `checked` mas falta o `onChange` | Passo 2.2 |
| `useEffect is not defined` | Faltou no import | Passo 3.1 |
| F5 e a lista some | Faltou o `useEffect` ou o `loadTasks` | Passos 3.3 e 3.4 |
| Tela branca: `Unexpected token` ou `is not valid JSON` | Tem lixo antigo na gaveta | Application → Local Storage → apague a chave `tasks` e dê F5 |
| Aparece `[object Object]` na aba Application | Salvou sem `JSON.stringify` | Passo 3.4 |

---

## Desafios (terminou? continue)

1. **Quantas faltam.** Mostre no título só as tarefas **não** feitas:
   `Minhas tarefas ({tasks.filter((task) => !task.done).length})`.
   Pergunta: por que o `!` antes do `task.done`?
2. **Limpar feitas.** Crie um botão "Limpar feitas" que remove de uma vez todas
   as tarefas marcadas. Dica: é um `filter`, parecido com o do Remover.
3. **Filtros.** Três botões: "Todas", "Pendentes", "Feitas". Dica: um terceiro
   `useState` guarda qual botão está ativo, e o `.map` roda numa lista já filtrada:
   ```tsx
   const [filter, setFilter] = useState("todas");
   ```
4. **Começar do zero.** Apague a chave `tasks` na aba Application e dê F5.
   Pergunta: qual linha do `loadTasks` rodou agora?

---

## Salvando no GitHub

Na **sua branch** de sempre:

```bash
git add .
git commit -m "marcar como feita e salvar no navegador"
git push
```
