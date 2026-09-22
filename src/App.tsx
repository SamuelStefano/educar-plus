/*
 * ═══════════════════════════════════════════════════════════════
 *  EDUCAR+ — Projeto: ToDo List (lista de tarefas)
 * ═══════════════════════════════════════════════════════════════
 *
 *  Este é o ponto de partida da AULA 4: a lista da aula 3 funcionando
 *  (fichas, marcar como feita e salvar no navegador).
 *
 *  Hoje a missão é:
 *    1. Editar o texto de uma tarefa com dois cliques.
 *    2. Filtrar a lista: Todas / Ativas / Feitas.
 *    3. Mostrar quantas tarefas ainda faltam.
 *
 *  O passo a passo está em AULA-4.md. Leia lá primeiro.
 */

import { useEffect, useState } from "react";

type Task = { id: number; text: string; done: boolean };

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
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
            <span className={task.done ? "text-gray-500 line-through" : ""}>{task.text}</span>
            <button className="text-red-400" onClick={() => removeTask(task.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
