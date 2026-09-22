# Aula 4 — editar tarefas e filtrar a lista

Na aula passada cada tarefa virou uma **ficha**, ganhou a caixinha de "feita"
e passou a sobreviver ao F5. Hoje ela ganha mais duas coisas que todo app de
tarefas tem:

- **corrigir o texto** de uma tarefa sem apagar e criar de novo
- **filtrar** a lista (Todas / Ativas / Feitas) e ver quantas faltam

Tudo continua em **`src/App.tsx`**.

> Sua aula 3 não ficou pronta? Sem problema. O `src/App.tsx` da `main` já
> começa com a aula 3 funcionando. Pegue ele com:
> `git checkout main -- src/App.tsx`

---

## Parte 1 — editar no lugar

### A ideia: o texto vira caixinha

Pense em **editar uma mensagem no WhatsApp**: você não apaga e manda outra.
A própria mensagem vira uma caixinha de texto, você corrige e confirma.

Aqui vai ser igual:

```txt
 [ ] Estudar Reac       <- dois cliques no texto
         |
         v
 [ ] [Estudar Reac_ ]   <- virou um campo, com o texto dentro
         |
   Enter: salva     Esc: desiste
         |
         v
 [ ] Estudar React
```

Para isso o app precisa lembrar **qual** tarefa está em edição agora. Só uma
por vez. Quem guarda isso? Um `useState` com o `id` dela:

```txt
editingId = null   -> ninguém está sendo editado
editingId = 2      -> a ficha de id 2 está virada em campo
```

**Teste no console** (F12 → Console). Trocar o texto de uma ficha é o mesmo
`map` do `toggleTask` da aula 3, só que trocando o `text`:

```js
const tarefas = [{ id: 1, text: "Beber agua", done: false }];
tarefas.map((t) => (t.id === 1 ? { ...t, text: "Beber 2L de água" } : t))
```

Viu? Uma lista **nova**, com a ficha 1 trocada. A velha continua igual:
digite `tarefas` e confira.

### Passo 1 — lembrar quem está em edição

Dentro do `App`, junto dos outros `useState`:

```tsx
const [editingId, setEditingId] = useState<number | null>(null);
const [editText, setEditText] = useState("");
```

- `editingId` → o `id` da ficha em edição, ou `null` (nenhuma)
- `editText` → o que está escrito no campo de edição

### Passo 2 — as três funções da edição

Dentro do `App`, antes do `return`:

```tsx
function startEdit(task: Task) {
  setEditingId(task.id);
  setEditText(task.text);
}

function saveEdit() {
  if (editText.trim() === "") return;
  setTasks(
    tasks.map((task) => (task.id === editingId ? { ...task, text: editText } : task))
  );
  setEditingId(null);
}

function cancelEdit() {
  setEditingId(null);
}
```

- `startEdit` → vira a ficha em campo, **já com o texto atual dentro**
- `saveEdit` → troca o texto (o `map` do Teste) e fecha o campo
- `cancelEdit` → só fecha o campo. A lista nem é tocada.

### Passo 3 — dois cliques e as teclas

Antes de mexer no código, veja o nome que o navegador dá para cada tecla.
**Teste no console:**

```js
document.addEventListener("keydown", (e) => console.log(e.key));
```

Agora clique na página e aperte **Enter** e **Esc**. O console mostra
`Enter` e `Escape`. São esses nomes que o código vai comparar.

No `<li>`, troque o `<span>` do texto por isto:

```tsx
{editingId === task.id ? (
  <input
    className="rounded bg-white px-2 py-1 text-black"
    value={editText}
    autoFocus
    onChange={(e) => setEditText(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") saveEdit();
      if (e.key === "Escape") cancelEdit();
    }}
  />
) : (
  <span
    className={task.done ? "text-gray-500 line-through" : ""}
    onDoubleClick={() => startEdit(task)}
  >
    {task.text}
  </span>
)}
```

Leia assim: *"se esta é a ficha em edição, mostre um campo; se não, mostre o
texto, que vira campo com dois cliques"*.

- `autoFocus` → o cursor já entra no campo, sem precisar clicar de novo
- `onDoubleClick` → o evento dos **dois cliques**

**Teste:** dê dois cliques em "Estudar React", mude o texto e aperte
**Enter**. Depois edite de novo e aperte **Esc**: o texto antigo fica.
Aperte **F5**: a correção continua lá (o `useEffect` da aula 3 salvou sozinho).

> ⚠️ `editingId === task.id` usa `===`. Com `=`, você não compara: você
> **troca** o valor, e dá erro de TypeScript.

---

## Parte 2 — filtro e contador

### A ideia: a aba do inventário

Pense no **inventário de um game**, com abas "Tudo", "Roupas", "Poções".
Quando você clica em "Poções", as roupas **não são jogadas fora**. Elas só
não aparecem nesta aba.

O filtro da lista é igual:

```txt
tasks (a lista de verdade, salva)     filtro = "ativas"     o que aparece
 id 1  Estudar React   done: false  ------------------->   Estudar React
 id 2  Beber água      done: true    (fica guardada, só não aparece)
 id 3  Fazer exercício done: false  ------------------->   Fazer exercício
```

**Regra nova:** a lista filtrada **não** vai para um `useState`. Ela é
**calculada** a cada desenho, a partir de `tasks` e do filtro escolhido. Assim
ela nunca fica desatualizada.

**Teste no console:**

```js
const lista = [
  { id: 1, text: "Estudar React", done: false },
  { id: 2, text: "Beber água", done: true },
  { id: 3, text: "Fazer exercício", done: false },
];
lista.filter((t) => !t.done)
lista.filter((t) => t.done)
lista.filter((t) => !t.done).length
```

A primeira linha dá as **ativas**, a segunda as **feitas**, a terceira
**quantas** faltam. É exatamente o que a tela vai usar.

### Passo 4 — guardar o filtro escolhido

Em cima do `App` (fora dele), junto do `type Task`:

```tsx
type Filter = "todas" | "ativas" | "feitas";
```

- o filtro só pode ser **uma dessas três palavras**. Um erro de digitação
  (`"ativa"`) vira erro vermelho no editor, não um bug escondido.

Dentro do `App`, junto dos outros `useState`:

```tsx
const [filter, setFilter] = useState<Filter>("todas");
```

### Passo 5 — calcular o que aparece

Dentro do `App`, **depois** das funções e **antes** do `return`:

```tsx
const visibleTasks = tasks.filter((task) => {
  if (filter === "ativas") return !task.done;
  if (filter === "feitas") return task.done;
  return true;
});

const remaining = tasks.filter((task) => !task.done).length;
```

- `return true` → na aba "todas", todo mundo passa
- `remaining` → conta em **`tasks`**, não em `visibleTasks`: "faltam 2" é
  verdade em qualquer aba

Agora, no `<ul>`, troque `tasks.map(` por:

```tsx
{visibleTasks.map((task) => (
```

**Teste:** salve e olhe o navegador. Nada mudou, porque o filtro começa em
`"todas"`. Troque o `useState<Filter>("todas")` por `"feitas"`, salve e veja
só as riscadas. Depois volte para `"todas"`.

### Passo 6 — a barra de filtros

Logo abaixo do `</ul>`:

```tsx
<div className="mt-4 flex items-center gap-2">
  <span className="mr-2 text-sm text-gray-400">{remaining} restantes</span>
  <button
    className={filter === "todas" ? "font-bold underline" : ""}
    onClick={() => setFilter("todas")}
  >
    Todas
  </button>
  <button
    className={filter === "ativas" ? "font-bold underline" : ""}
    onClick={() => setFilter("ativas")}
  >
    Ativas
  </button>
  <button
    className={filter === "feitas" ? "font-bold underline" : ""}
    onClick={() => setFilter("feitas")}
  >
    Feitas
  </button>
</div>
```

- o botão da aba escolhida fica **em negrito e sublinhado**, para você saber
  onde está

**Teste:** clique em "Ativas" e marque uma tarefa como feita. Ela **some**
desta aba (foi para "Feitas") e o contador diminui. Clique em "Feitas" e
desmarque: ela volta para "Ativas".

---

## Resumo

| Ação | Código | Em português |
|---|---|---|
| Quem está em edição | `useState<number \| null>(null)` | o `id` da ficha virada em campo, ou ninguém |
| Salvar edição | `tasks.map((t) => (t.id === editingId ? { ...t, text: editText } : t))` | a lista de antes, com um texto trocado |
| Teclas | `e.key === "Enter"` / `e.key === "Escape"` | confirmar / desistir |
| Filtrar | `tasks.filter((t) => !t.done)` | só as que faltam |
| Contar | `tasks.filter((t) => !t.done).length` | quantas faltam |

**Regra nova:** o que dá para **calcular** a partir do estado não vai para o
`useState`. A lista filtrada e o contador são calculados a cada desenho.

---

## Deu erro?

| O que aparece | O que aconteceu | Solução |
|---|---|---|
| Dois cliques e nada acontece | Colocou o `onDoubleClick` no `<li>` errado ou no botão | Passo 3: vai no `<span>` do texto |
| Abre campo em **todas** as tarefas | Comparou `editingId !== task.id` | O certo é `===` |
| O campo abre vazio | Faltou o `setEditText(task.text)` | Passo 2, `startEdit` |
| Não consigo digitar no campo | Tem `value={editText}` mas falta o `onChange` | Passo 3 |
| Enter não salva | Escreveu `"enter"` minúsculo | É `"Enter"`, com E maiúsculo (veja o Teste do Passo 3) |
| Esc não desiste | Escreveu `"Esc"` | O nome é `"Escape"` |
| `Cannot find name 'Filter'` | Faltou o `type Filter` | Passo 4, fora do `App` |
| `Argument of type '"ativa"' is not assignable` | Erro de digitação no filtro | Use uma das três: `"todas"`, `"ativas"`, `"feitas"` |
| O filtro não muda nada | O `<ul>` ainda usa `tasks.map` | Passo 5: `visibleTasks.map` |
| O contador muda quando troco de aba | Contou em `visibleTasks` | Conte em `tasks` |

---

## Desafios (terminou? continue)

1. **Sair clicando fora.** Hoje, se você clica fora do campo de edição, ele
   continua aberto. Faça ele **salvar** quando perde o foco. Dica: o evento se
   chama `onBlur`.
2. **Apagar editando.** Se a pessoa apagar todo o texto e der Enter, nada
   acontece. Mude o `saveEdit` para **remover** a tarefa nesse caso. Dica: você
   já tem o `removeTask`.
3. **Plural certo.** Com uma tarefa só, aparece "1 restantes". Mostre
   "1 restante" e "2 restantes". Dica: `remaining === 1 ? ... : ...`.
4. **Lista vazia.** Na aba "Feitas", sem nenhuma feita, a tela fica em branco.
   Mostre a frase "Nada por aqui." quando `visibleTasks.length === 0`.
   Pergunta: por que usar `visibleTasks` aqui, e não `tasks`?

---

## Salvando no GitHub

Na **sua branch** de sempre:

```bash
git add .
git commit -m "editar tarefas e filtrar a lista"
git push
```
