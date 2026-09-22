/*
 * ═══════════════════════════════════════════════════════════════
 *  EDUCAR+ — Projeto: ToDo List (lista de tarefas)
 * ═══════════════════════════════════════════════════════════════
 *
 *  Este é o ponto de partida da AULA 3: a lista da aula 2 funcionando
 *  (adicionar e remover).
 *
 *  Hoje a missão é:
 *    1. Transformar cada tarefa numa "ficha" (um objeto).
 *    2. Marcar uma tarefa como feita.
 *    3. Salvar a lista no navegador, para ela sobreviver ao F5.
 *
 *  O passo a passo está em AULA-3.md. Leia lá primeiro.
 */

import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState(["Estudar React", "Fazer exercício", "Beber água"]);
  const [text, setText] = useState("");

  function addTask() {
    if (text.trim() === "") return;
    setTasks([...tasks, text]);
    setText("");
  }

  function removeTask(index: number) {
    setTasks(tasks.filter((_, i) => i !== index));
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
        {tasks.map((task, index) => (
          <li key={task} className="flex items-center gap-2">
            <span>{task}</span>
            <button className="text-red-400" onClick={() => removeTask(index)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
