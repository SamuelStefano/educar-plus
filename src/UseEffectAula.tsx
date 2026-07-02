import { useState, useEffect } from "react";

/*
 * ═══════════════════════════════════════════════════════════════
 *  AULA: useEffect — O "Alarme Inteligente" do React
 * ═══════════════════════════════════════════════════════════════
 *
 *  Você já aprendeu useState → ele GUARDA informações.
 *  Agora vai aprender useEffect → ele FAZ COISAS AUTOMATICAMENTE.
 *
 *  Pensa assim:
 *    useState  = a memória do seu app (guarda dados)
 *    useEffect = o alarme do seu app (dispara ações sozinho)
 *
 *  Sintaxe:
 *    useEffect(() => {
 *      // O QUE fazer
 *    }, [QUANDO fazer])
 *
 *  Os colchetes [] no final são a parte mais importante!
 *  Eles dizem PRO REACT quando rodar o código de dentro.
 */

// ─────────────────────────────────────────────
// EXEMPLO 1: useEffect com [] (array vazio)
// "Roda UMA VEZ quando a tela abre"
// ─────────────────────────────────────────────
/*
 * Analogia: quando você abre o Instagram, ele carrega os posts
 * automaticamente. Você não clica num botão "carregar".
 * O useEffect com [] faz exatamente isso.
 */
function Exemplo1_ArrayVazio() {
  // Começa mostrando "Carregando..." pro usuário
  const [mensagem, setMensagem] = useState("⏳ Carregando...");

  // Contador pra provar que o useEffect só roda 1 vez
  const [vezesQueRodou, setVezesQueRodou] = useState(0);

  // Esse estado é só pra forçar a tela a atualizar (pra testar)
  const [cliques, setCliques] = useState(0);

  useEffect(() => {
    /*
     * Esse código aqui dentro roda SOZINHO quando a tela aparece.
     * Ninguém clicou em nada — ele roda automaticamente.
     *
     * O [] vazio no final significa: "rode isso UMA VEZ e pronto".
     *
     * É como o alarme que toca só quando você LIGA o celular.
     * Ligou? Tocou. Depois não toca mais.
     */

    // Simula um "carregamento" de 1.5 segundos (como se fosse buscar dados)
    setTimeout(() => {
      setMensagem("✅ Bem-vindo à aula de useEffect!");
      setVezesQueRodou(1);
    }, 1500);
  }, []); // ← ARRAY VAZIO = roda só 1 vez

  return (
    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-6">
      <h3 className="mb-1 text-lg font-bold text-emerald-400">
        Exemplo 1: Array vazio [ ]
      </h3>
      <p className="mb-4 text-sm text-white/50">
        "Roda UMA VEZ quando a tela abre"
      </p>

      {/* Mostra a mensagem que muda automaticamente */}
      <div className="mb-4 rounded bg-black/50 p-4 text-center text-xl">
        {mensagem}
      </div>

      {/* Informações pra entender o que aconteceu */}
      <div className="mb-4 space-y-1 text-sm text-white/70">
        <p>
          🔢 useEffect rodou: <strong>{vezesQueRodou}x</strong>
        </p>
        <p>
          👆 Você clicou: <strong>{cliques}x</strong>
        </p>
      </div>

      {/* Botão pra provar que clicar NÃO faz o useEffect rodar de novo */}
      <button
        onClick={() => setCliques(cliques + 1)}
        className="rounded border border-emerald-500/50 px-4 py-2 text-sm transition hover:bg-emerald-500/20"
      >
        Clique aqui (o useEffect NÃO vai rodar de novo)
      </button>

      <p className="mt-3 text-xs text-white/40">
        👆 Pode clicar quantas vezes quiser — o useEffect com [] só rodou 1
        vez!
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// EXEMPLO 2: useEffect observando UMA variável
// "Roda toda vez que essa variável mudar"
// ─────────────────────────────────────────────
/*
 * Analogia: quando você muda de música no Spotify,
 * a notificação no topo do celular muda sozinha.
 * Ela está "observando" qual música está tocando.
 */
function Exemplo2_UmaVariavel() {
  // A música que está tocando agora
  const [musica, setMusica] = useState("Blinding Lights");

  // A notificação que aparece automaticamente
  const [notificacao, setNotificacao] = useState("");

  // Conta quantas vezes o useEffect disparou
  const [disparos, setDisparos] = useState(0);

  // Lista de músicas pra alternar
  const playlist = [
    "Blinding Lights",
    "Levitating",
    "Flowers",
    "Anti-Hero",
    "Cruel Summer",
  ];

  useEffect(() => {
    /*
     * Esse código roda toda vez que 'musica' mudar.
     *
     * [musica] no final = "fique de olho na variável 'musica'"
     *
     * É como a notificação do Spotify:
     *   Mudou a música? → Notificação aparece!
     *   Não mudou?      → Nada acontece.
     */
    setNotificacao(`🎵 Tocando agora: ${musica}`);
    setDisparos((anterior) => anterior + 1);
  }, [musica]); // ← Observa 'musica'. Mudou? Roda!

  // Pega a próxima música da playlist
  function proximaMusica() {
    const indexAtual = playlist.indexOf(musica);
    const proximoIndex = (indexAtual + 1) % playlist.length;
    setMusica(playlist[proximoIndex]);
  }

  return (
    <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-6">
      <h3 className="mb-1 text-lg font-bold text-blue-400">
        Exemplo 2: Observando UMA variável [musica]
      </h3>
      <p className="mb-4 text-sm text-white/50">
        "Roda toda vez que 'musica' mudar"
      </p>

      {/* Simula a notificação do Spotify */}
      <div className="mb-4 rounded bg-black/50 p-4 text-center">
        <p className="text-lg">{notificacao}</p>
      </div>

      <p className="mb-4 text-sm text-white/70">
        ⚡ useEffect disparou: <strong>{disparos}x</strong>
      </p>

      {/* Botões de música */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={proximaMusica}
          className="rounded border border-blue-500/50 px-4 py-2 text-sm transition hover:bg-blue-500/20"
        >
          ⏭ Próxima música
        </button>

        {/* Botão que NÃO muda a música — pra mostrar que o useEffect NÃO roda */}
        <button
          onClick={() => setMusica(musica)} // seta o MESMO valor!
          className="rounded border border-white/20 px-4 py-2 text-sm transition hover:bg-white/10"
        >
          🔁 Setar mesma música (useEffect NÃO roda)
        </button>
      </div>

      <p className="mt-3 text-xs text-white/40">
        👆 O segundo botão seta o MESMO valor — o React percebe que não mudou e
        NÃO roda o useEffect.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// EXEMPLO 3: useEffect observando VÁRIAS variáveis
// "Roda quando QUALQUER uma delas mudar"
// ─────────────────────────────────────────────
/*
 * Analogia: Pensa no boletim escolar.
 * Se a MATÉRIA muda OU a NOTA muda, o boletim atualiza.
 * Não importa qual mudou — qualquer uma das duas dispara a atualização.
 */
function Exemplo3_VariasVariaveis() {
  const [materia, setMateria] = useState("Matemática");
  const [nota, setNota] = useState(7);
  const [boletim, setBoletim] = useState("");
  const [disparos, setDisparos] = useState(0);

  const materias = ["Matemática", "Português", "História", "Ciências"];

  useEffect(() => {
    /*
     * [materia, nota] = observa as DUAS variáveis.
     *
     * Mudou a matéria? → Roda ✅
     * Mudou a nota?    → Roda ✅
     * Mudou as duas?   → Roda ✅ (1 vez só)
     * Nenhuma mudou?   → NÃO roda ❌
     */
    setBoletim(`📋 ${materia}: nota ${nota}`);
    setDisparos((anterior) => anterior + 1);
  }, [materia, nota]); // ← Observa as DUAS

  function proximaMateria() {
    const index = materias.indexOf(materia);
    setMateria(materias[(index + 1) % materias.length]);
  }

  return (
    <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-6">
      <h3 className="mb-1 text-lg font-bold text-purple-400">
        Exemplo 3: Observando VÁRIAS variáveis [materia, nota]
      </h3>
      <p className="mb-4 text-sm text-white/50">
        "Roda quando QUALQUER uma mudar"
      </p>

      {/* Boletim que atualiza automaticamente */}
      <div className="mb-4 rounded bg-black/50 p-4 text-center text-xl">
        {boletim}
      </div>

      <p className="mb-4 text-sm text-white/70">
        ⚡ useEffect disparou: <strong>{disparos}x</strong>
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={proximaMateria}
          className="rounded border border-purple-500/50 px-4 py-2 text-sm transition hover:bg-purple-500/20"
        >
          📚 Mudar matéria
        </button>
        <button
          onClick={() => setNota(nota + 1)}
          className="rounded border border-purple-500/50 px-4 py-2 text-sm transition hover:bg-purple-500/20"
        >
          📈 Aumentar nota (+1)
        </button>
        <button
          onClick={() => setNota(nota - 1)}
          className="rounded border border-purple-500/50 px-4 py-2 text-sm transition hover:bg-purple-500/20"
        >
          📉 Diminuir nota (-1)
        </button>
      </div>

      <p className="mt-3 text-xs text-white/40">
        👆 Cada botão muda uma variável diferente — e o useEffect roda em
        qualquer caso!
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// EXEMPLO 4: useEffect SEM array (CUIDADO!)
// "Roda TODA VEZ que qualquer coisa mudar"
// ─────────────────────────────────────────────
/*
 * Analogia: Imagina um alarme que toca a cada segundo.
 * Irritante, né? Gasta bateria, atrapalha tudo.
 *
 * useEffect sem array é assim — roda sem parar.
 * Na maioria dos casos, NÃO é isso que você quer.
 *
 * ⚠️ CUIDADO: se dentro do useEffect sem array você mudar
 * um estado, ele vai criar um LOOP INFINITO!
 * (muda estado → tela atualiza → useEffect roda → muda estado → ...)
 */
function Exemplo4_SemArray() {
  const [cliques, setCliques] = useState(0);
  const [disparos, setDisparos] = useState(0);

  useEffect(() => {
    /*
     * SEM ARRAY no final = roda SEMPRE que o componente atualizar.
     *
     * ⚠️ Aqui é seguro porque estamos usando a forma funcional
     * do setState (anterior => anterior + 1), que não causa loop.
     *
     * MAS se fizéssemos setDisparos(disparos + 1) sem a forma
     * funcional, causaria um LOOP INFINITO! Não faça isso!
     */
    setDisparos((anterior) => anterior + 1);
  }); // ← SEM ARRAY! Roda sempre!

  return (
    <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-6">
      <h3 className="mb-1 text-lg font-bold text-red-400">
        Exemplo 4: SEM array ⚠️
      </h3>
      <p className="mb-4 text-sm text-white/50">
        "Roda TODA VEZ que qualquer coisa mudar — evite!"
      </p>

      <div className="mb-4 rounded bg-black/50 p-4 text-center">
        <p className="text-white/70">
          👆 Cliques: <strong className="text-white">{cliques}</strong>
        </p>
        <p className="text-white/70">
          ⚡ useEffect disparou:{" "}
          <strong className="text-red-400">{disparos}x</strong>
        </p>
      </div>

      <button
        onClick={() => setCliques(cliques + 1)}
        className="rounded border border-red-500/50 px-4 py-2 text-sm transition hover:bg-red-500/20"
      >
        Clique aqui e veja o useEffect disparar
      </button>

      <p className="mt-3 text-xs text-red-400/70">
        ⚠️ Perceba que o número de disparos cresce MUITO rápido! Cada clique
        causa múltiplas atualizações. Isso é ruim pro desempenho.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// EXEMPLO 5: Caso real — To-Do List com salvamento
// "Salva automaticamente quando a lista muda"
// ─────────────────────────────────────────────
/*
 * Analogia: Quando você edita um documento no Google Docs,
 * ele SALVA SOZINHO. Você não clica em "Salvar".
 *
 * Aqui vamos fazer o mesmo: toda vez que a lista mudar,
 * o useEffect salva no navegador automaticamente.
 */
function Exemplo5_CasoReal() {
  const [tarefas, setTarefas] = useState<string[]>([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [statusSalvamento, setStatusSalvamento] = useState("💤 Nada salvo ainda");
  const [carregou, setCarregou] = useState(false);

  // PRIMEIRO useEffect: carrega tarefas salvas quando o app abre
  useEffect(() => {
    /*
     * [] = roda só 1 vez, quando a tela aparece.
     *
     * localStorage é como uma "memória" do navegador.
     * Mesmo se você fechar a aba e abrir de novo,
     * os dados ainda estão lá!
     */
    const salvas = localStorage.getItem("aula_useeffect_tarefas");
    if (salvas) {
      setTarefas(JSON.parse(salvas));
    }
    setCarregou(true);
  }, []); // ← Roda 1 vez = carrega dados salvos

  // SEGUNDO useEffect: salva automaticamente quando a lista muda
  useEffect(() => {
    /*
     * [tarefas] = roda toda vez que 'tarefas' mudar.
     *
     * Adicionou tarefa? → Salva!
     * Removeu tarefa?   → Salva!
     *
     * É como o auto-save do Google Docs.
     */
    if (!carregou) return; // Não salva antes de carregar (evita sobrescrever)

    localStorage.setItem("aula_useeffect_tarefas", JSON.stringify(tarefas));
    setStatusSalvamento(`✅ Salvo! (${tarefas.length} tarefas)`);
  }, [tarefas, carregou]); // ← Observa 'tarefas'

  function adicionar() {
    const texto = novaTarefa.trim();
    if (texto === "") return;
    setTarefas([...tarefas, texto]);
    setNovaTarefa("");
  }

  function remover(index: number) {
    setTarefas(tarefas.filter((_, i) => i !== index));
  }

  return (
    <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-6">
      <h3 className="mb-1 text-lg font-bold text-amber-400">
        Exemplo 5: Caso Real — To-Do com Auto-Save
      </h3>
      <p className="mb-4 text-sm text-white/50">
        "Salva automaticamente quando a lista muda — como o Google Docs"
      </p>

      {/* Status do salvamento */}
      <div className="mb-4 rounded bg-black/50 p-3 text-center text-sm">
        {statusSalvamento}
      </div>

      {/* Input + Botão */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && adicionar()}
          placeholder="Nova tarefa..."
          className="flex-1 rounded border border-amber-500/30 bg-transparent px-3 py-2 text-sm outline-none focus:border-amber-500"
        />
        <button
          onClick={adicionar}
          className="rounded border border-amber-500/50 px-4 py-2 text-sm transition hover:bg-amber-500/20"
        >
          Adicionar
        </button>
      </div>

      {/* Lista de tarefas */}
      <ul className="space-y-2">
        {tarefas.length === 0 && (
          <li className="text-sm text-white/30">Nenhuma tarefa ainda...</li>
        )}
        {tarefas.map((tarefa, index) => (
          <li
            key={index}
            className="flex items-center justify-between rounded bg-black/30 px-3 py-2 text-sm"
          >
            <span>{tarefa}</span>
            <button
              onClick={() => remover(index)}
              className="text-red-400 transition hover:text-red-300"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs text-white/40">
        💡 Feche a aba e abra de novo — as tarefas continuam lá! O useEffect
        salvou no navegador.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// SEÇÃO: Erros Comuns
// ─────────────────────────────────────────────
function ErrosComuns() {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
      <h3 className="mb-4 text-lg font-bold text-white">
        ⚠️ Erros Comuns de Iniciante
      </h3>

      <div className="space-y-6">
        {/* Erro 1 */}
        <div>
          <p className="mb-2 font-medium text-red-400">
            ❌ Erro 1: Esquecer o array [ ]
          </p>
          <pre className="mb-2 overflow-x-auto rounded bg-black/80 p-3 text-sm">
            <code className="text-red-300">{`// ❌ ERRADO — roda sem parar!
useEffect(() => {
  setContador(contador + 1)
})  // ← cadê o []?

// ✅ CERTO — roda só 1 vez
useEffect(() => {
  setContador(contador + 1)
}, [])  // ← aqui!`}</code>
          </pre>
          <p className="text-sm text-white/60">
            Sem o [ ], o useEffect roda → muda estado → tela atualiza →
            useEffect roda de novo → <strong>loop infinito!</strong> O app
            trava.
          </p>
        </div>

        {/* Erro 2 */}
        <div>
          <p className="mb-2 font-medium text-red-400">
            ❌ Erro 2: Esquecer a variável no array
          </p>
          <pre className="mb-2 overflow-x-auto rounded bg-black/80 p-3 text-sm">
            <code className="text-red-300">{`// ❌ ERRADO — nunca reage à mudança de 'nome'
useEffect(() => {
  console.log("Nome:", nome)
}, [])  // ← array vazio ignora 'nome'

// ✅ CERTO — reage quando 'nome' muda
useEffect(() => {
  console.log("Nome:", nome)
}, [nome])  // ← agora observa 'nome'`}</code>
          </pre>
          <p className="text-sm text-white/60">
            Se você quer reagir a uma variável, <strong>coloque ela no array</strong>.
            Array vazio = "não observo ninguém".
          </p>
        </div>

        {/* Erro 3 */}
        <div>
          <p className="mb-2 font-medium text-red-400">
            ❌ Erro 3: Colocar useEffect fora do componente
          </p>
          <pre className="mb-2 overflow-x-auto rounded bg-black/80 p-3 text-sm">
            <code className="text-red-300">{`// ❌ ERRADO — fora do componente
useEffect(() => { ... }, [])

function App() {
  return <h1>Oi</h1>
}

// ✅ CERTO — DENTRO do componente
function App() {
  useEffect(() => { ... }, [])
  return <h1>Oi</h1>
}`}</code>
          </pre>
          <p className="text-sm text-white/60">
            Hooks (useState, useEffect, etc.) só funcionam <strong>dentro</strong> de
            componentes React.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL DA AULA
// ─────────────────────────────────────────────
function UseEffectAula() {
  return (
    <div className="min-h-screen bg-black p-6 text-white md:p-10">
      {/* Cabeçalho */}
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold">
          🧠 useEffect — O "Alarme Inteligente" do React
        </h1>
        <p className="mb-2 text-white/60">
          Você já sabe <strong>useState</strong> (guardar dados). Agora vai
          aprender <strong>useEffect</strong> (fazer coisas automaticamente).
        </p>
        <p className="mb-8 text-sm text-white/40">
          Interaja com os exemplos abaixo para entender cada tipo de useEffect!
        </p>

        {/* Cheat Sheet no topo */}
        <div className="mb-10 rounded-lg border border-white/20 bg-white/5 p-5">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-white/50">
            📌 Cola Rápida
          </h2>
          <div className="grid gap-2 text-sm sm:grid-cols-2">
            <div className="rounded bg-emerald-500/10 p-3">
              <code className="text-emerald-400">useEffect(fn, [])</code>
              <p className="mt-1 text-white/60">Roda 1 vez (tela abriu)</p>
            </div>
            <div className="rounded bg-blue-500/10 p-3">
              <code className="text-blue-400">useEffect(fn, [x])</code>
              <p className="mt-1 text-white/60">Roda quando x mudar</p>
            </div>
            <div className="rounded bg-purple-500/10 p-3">
              <code className="text-purple-400">useEffect(fn, [x, y])</code>
              <p className="mt-1 text-white/60">Roda quando x OU y mudar</p>
            </div>
            <div className="rounded bg-red-500/10 p-3">
              <code className="text-red-400">useEffect(fn)</code>
              <p className="mt-1 text-white/60">Roda SEMPRE ⚠️ evite!</p>
            </div>
          </div>
        </div>

        {/* Exemplos interativos */}
        <div className="space-y-8">
          <Exemplo1_ArrayVazio />
          <Exemplo2_UmaVariavel />
          <Exemplo3_VariasVariaveis />
          <Exemplo4_SemArray />
          <Exemplo5_CasoReal />
          <ErrosComuns />
        </div>

        {/* Resumo final */}
        <div className="mt-10 rounded-lg border-2 border-white/30 bg-white/10 p-6 text-center">
          <p className="text-lg font-bold">💡 Frase pra memorizar:</p>
          <p className="mt-2 text-xl text-amber-400">
            "useEffect é um alarme inteligente: você diz O QUE fazer e QUANDO
            disparar, e o React cuida do resto."
          </p>
        </div>

        {/* Rodapé */}
        <p className="mt-8 pb-8 text-center text-xs text-white/30">
          Aula interativa de React Hooks — useEffect
        </p>
      </div>
    </div>
  );
}

export default UseEffectAula;
