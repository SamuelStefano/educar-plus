import { useState } from "react";
import UseEffectAula from "./UseEffectAula";
import PraticaAula from "./PraticaAula";

type Tarefa = {
  id: number;
  texto: string;
};

// ─────────────────────────────────────────────
// Página do CRUD (aula anterior — useState)
// ─────────────────────────────────────────────
function CrudPage() {
  /*
   * O que é CRUD?
   * É um jeito simples de pensar em qualquer lista de coisas:
   *
   * C = Criar   → colocar algo novo na lista
   * R = Ler     → ver o que está na lista (visualizar)
   * U = Atualizar → mudar algo que já existe
   * D = Deletar → tirar algo da lista
   */

  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const [textoNovo, setTextoNovo] = useState("");
  const [tarefaVisualizada, setTarefaVisualizada] = useState<Tarefa | null>(null);
  const [tarefaEditando, setTarefaEditando] = useState<number | null>(null);
  const [textoEditado, setTextoEditado] = useState("");
  const [proximoId, setProximoId] = useState(3);

  // CRIAR
  function adicionarTarefa() {
    const texto = textoNovo.trim();
    if (texto === "") return;

    setTarefas([...tarefas, { id: proximoId, texto }]);
    setProximoId(proximoId + 1);
    setTextoNovo("");
  }

  // LER
  function visualizarTarefa(tarefa: Tarefa) {
    setTarefaVisualizada(tarefa);
    setTarefaEditando(null);
  }

  // ATUALIZAR
  function comecarEdicao(tarefa: Tarefa) {
    setTarefaEditando(tarefa.id);
    setTextoEditado(tarefa.texto);
    setTarefaVisualizada(null);
  }

  function salvarEdicao(id: number) {
    const texto = textoEditado.trim();
    if (texto === "") return;

    setTarefas(tarefas.map((t) => (t.id === id ? { ...t, texto } : t)));
    setTarefaEditando(null);
    setTextoEditado("");
  }

  // DELETAR
  function excluirTarefa(id: number) {
    setTarefas(tarefas.filter((t) => t.id !== id));
    if (tarefaVisualizada?.id === id) setTarefaVisualizada(null);
    if (tarefaEditando === id) setTarefaEditando(null);
  }

  return (
    <>
      <h1 className="mb-8 text-2xl">Tarefas (CRUD — useState)</h1>

      {/* CRIAR */}
      <div className="mb-10 flex gap-2">
        <input
          type="text"
          value={textoNovo}
          onChange={(e) => setTextoNovo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && adicionarTarefa()}
          placeholder="Nova tarefa"
          className="flex-1 border-b border-white bg-transparent outline-none"
        />
        <button onClick={adicionarTarefa} className="border border-white px-4">
          Adicionar
        </button>
      </div>

      {/* LER */}
      <ul className="mb-10 space-y-4">
        {tarefas.length === 0 && <li className="opacity-50">Lista vazia</li>}

        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className="flex items-center gap-3 border-b border-white/20 pb-4">
            {tarefaEditando === tarefa.id ? (
              <>
                <input
                  type="text"
                  value={textoEditado}
                  onChange={(e) => setTextoEditado(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && salvarEdicao(tarefa.id)}
                  className="flex-1 border-b border-white bg-transparent outline-none"
                  autoFocus
                />
                <button onClick={() => salvarEdicao(tarefa.id)}>Salvar</button>
              </>
            ) : (
              <>
                <span className="flex-1">{tarefa.texto}</span>
                <button onClick={() => visualizarTarefa(tarefa)}>Ver</button>
                <button onClick={() => comecarEdicao(tarefa)}>Editar</button>
                <button onClick={() => excluirTarefa(tarefa.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {tarefaVisualizada && (
        <div className="border border-white p-4">
          <p>#{tarefaVisualizada.id}</p>
          <p>{tarefaVisualizada.texto}</p>
          <button onClick={() => setTarefaVisualizada(null)} className="mt-4">
            Fechar
          </button>
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────
// App principal com navegação entre aulas
// ─────────────────────────────────────────────
function App() {
  // "pagina" controla qual aula está visível
  const [pagina, setPagina] = useState<"crud" | "useeffect" | "pratica">("pratica");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navegação entre aulas */}
      <nav className="sticky top-0 z-50 flex gap-2 border-b border-white/10 bg-black/90 p-4 backdrop-blur">
        <button
          onClick={() => setPagina("crud")}
          className={`rounded px-4 py-2 text-sm transition ${
            pagina === "crud"
              ? "bg-white text-black"
              : "border border-white/20 hover:bg-white/10"
          }`}
        >
          Aula 1: useState (CRUD)
        </button>
        <button
          onClick={() => setPagina("useeffect")}
          className={`rounded px-4 py-2 text-sm transition ${
            pagina === "useeffect"
              ? "bg-white text-black"
              : "border border-white/20 hover:bg-white/10"
          }`}
        >
          Aula 2: useEffect
        </button>
        <button
          onClick={() => setPagina("pratica")}
          className={`rounded px-4 py-2 text-sm transition ${
            pagina === "pratica"
              ? "bg-white text-black"
              : "border border-white/20 hover:bg-white/10"
          }`}
        >
          Aula 3: Prática
        </button>
      </nav>

      {/* Conteúdo da aula selecionada */}
      <div className="p-8">
        {pagina === "crud" && <CrudPage />}
        {pagina === "useeffect" && <UseEffectAula />}
        {pagina === "pratica" && <PraticaAula />}
      </div>
    </div>
  );
}

export default App;
