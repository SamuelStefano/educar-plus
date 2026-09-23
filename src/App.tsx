/*
 * ═══════════════════════════════════════════════════════════════
 *  EDUCAR+ — Projeto: ToDo List (lista de tarefas)
 * ═══════════════════════════════════════════════════════════════
 *
 *  Este é o ponto de partida da AULA 5: a lista da aula 4 funcionando
 *  (fichas, feita, salvar, editar com dois cliques, filtros e contador).
 *
 *  Hoje a missão é quebrar este arquivo em peças:
 *    1. TaskForm   — o campo e o botão "Adicionar".
 *    2. TaskItem   — uma tarefa da lista.
 *    3. FilterBar  — o contador e os botões de filtro.
 *
 *  O passo a passo está em AULA-5.md. Leia lá primeiro.
 */

import { useEffect, useState } from "react";

type Task = { id: number; text: string; done: boolean };
type Filter = "todas" | "ativas" | "feitas";

function loadTasks(): Task[] {
  const saved = localStorage.getItem("tasks");
  if (saved === null) {
    return [{ id: 1, text: "Estudar React", done: false }];
  }
  return JSON.parse(saved);
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState<Filter>("todas");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (text.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: text, done: false }]);
    setText("");
  }

  function removeTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleTask(id: number) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  }

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

  const visibleTasks = tasks.filter((task) => {
    if (filter === "ativas") return !task.done;
    if (filter === "feitas") return task.done;
    return true;
  });

  const remaining = tasks.filter((task) => !task.done).length;

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <h1 className="text-2xl font-bold">Minhas tarefas</h1>

      <div className="mt-4 flex gap-2">
        <input
          className="rounded bg-white px-2 py-1 text-black"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="rounded bg-white px-3 py-1 text-black" onClick={addTask}>
          Adicionar
        </button>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {visibleTasks.map((task) => (
          <li key={task.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
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
            <button className="text-red-400" onClick={() => removeTask(task.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

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
    </div>
  );
}

export default App;
