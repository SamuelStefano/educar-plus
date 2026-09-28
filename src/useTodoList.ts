// SECUNDÁRIO: não está em uso no momento. A fonte da verdade é src/TodoAula.tsx.
import { useState } from "react";
import type { KeyboardEvent } from "react";

const initialTasks = [
  "Estudar React",
  "Fazer exercício",
  "Beber água",
  "Revisar a aula de arrays",
  "Ajudar um colega no código",
];

export function useTodoList() {
  const [tasks, setTasks] = useState(initialTasks);
  const [text, setText] = useState("");

  function addTask() {
    const trimmed = text.trim();
    if (trimmed === "") return;

    setTasks([...tasks, trimmed]);
    setText("");
  }

  function removeTask(indexToRemove: number) {
    setTasks(tasks.filter((_, index) => index !== indexToRemove));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") addTask();
  }

  return {
    tasks,
    text,
    setText,
    addTask,
    removeTask,
    handleKeyDown,
  };
}
