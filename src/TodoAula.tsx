/*
 * ═══════════════════════════════════════════════════════════════
 *  EDUCAR+ — ToDo List: a lógica, completando ao vivo
 * ═══════════════════════════════════════════════════════════════
 *
 *  A tela está pronta e os botões já estão ligados às funções.
 *  Falta só a lógica: cada "RESPOSTA:" mostra o que escrever logo abaixo.
 *
 *  Ordem da aula:
 *    PASSO 1 — a lista vai para o useState
 *    PASSO 2 — removeTask (Remover)
 *    PASSO 3 — o texto do campo vai para o useState
 *    PASSO 4 — ligar o campo (value + onChange)
 *    PASSO 5 — addTask (Adicionar)
 *
 *  Para ver este arquivo no navegador, em src/main.tsx troque
 *    import App from './App.tsx'
 *  por
 *    import App from './TodoAula.tsx'
 */

import { useState } from "react";

function TodoAula() {
  // PASSO 1 — troque a linha de baixo por:
  // RESPOSTA: const [tasks, setTasks] = useState(["Estudar React", "Fazer exercício", "Beber água"]);
  const tasks = ["Estudar React", "Fazer exercício", "Beber água"];

  // PASSO 3 — o que está sendo digitado:
  // RESPOSTA: const [text, setText] = useState("");

  function addTask() {
    // PASSO 5 — campo vazio não entra, a nova vai no fim, o campo limpa:
    // RESPOSTA: if (text.trim() === "") return;
    // RESPOSTA: setTasks([...tasks, text]);
    // RESPOSTA: setText("");
  }

  function removeTask(index: number) {
    // PASSO 2 — uma lista nova, sem a posição clicada:
    // RESPOSTA: setTasks(tasks.filter((_, i) => i !== index));
  }

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <h1 className="text-2xl font-bold">Minhas tarefas</h1>

      <div className="mt-4 flex gap-2">
        {/*
          PASSO 4 — coloque no input, abaixo do placeholder:
          RESPOSTA: value={text}
          RESPOSTA: onChange={(e) => setText(e.target.value)}
        */}
        <input
          className="flex-1 rounded border border-gray-600 bg-gray-900 px-3 py-2"
          placeholder="O que você precisa fazer?"
        />
        <button className="rounded bg-blue-600 px-4 py-2" onClick={addTask}>
          Adicionar
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {tasks.map((task, index) => (
          <li
            key={task}
            className="flex items-center justify-between rounded border border-gray-700 p-3"
          >
            <span>{task}</span>
            <button
              className="rounded bg-red-600 px-3 py-1 text-sm"
              onClick={() => removeTask(index)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoAula;
