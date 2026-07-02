import { useState, useEffect } from "react";

/*
 * ═══════════════════════════════════════════════════════════════
 *  PRÁTICA: useState + useEffect
 * ═══════════════════════════════════════════════════════════════
 *
 *  Aqui é SUA VEZ de codar!
 *  A interface já está pronta. Os estados já existem.
 *  Você só precisa completar a LÓGICA nos lugares marcados.
 *
 *  Procure por "DESAFIO" nos comentários.
 */

// ─────────────────────────────────────────────
// EXERCÍCIO 1: Contador com limite
// ─────────────────────────────────────────────
function Exercicio1_Contador() {
  const [contador, setContador] = useState(0);
  const [mensagem, setMensagem] = useState("");

  function incrementar() {
    // DESAFIO:
    // Aumente o contador em 1, mas NÃO deixe passar de 10.
    //
    // Dicas:
    // - Use setContador() para mudar o valor.
    // - Use um if para verificar se o contador é menor que 10.
    // - Se já chegou em 10, não faça nada (ou mostre uma mensagem).
  }

  function decrementar() {
    // DESAFIO:
    // Diminua o contador em 1, mas NÃO deixe ficar abaixo de 0.
    //
    // Dicas:
    // - Use setContador() para mudar o valor.
    // - Use um if para verificar se o contador é maior que 0.
  }

  function resetar() {
    // DESAFIO:
    // Volte o contador para 0.
    //
    // Dicas:
    // - Use setContador().
    // - Limpe a mensagem também com setMensagem("").
  }

  useEffect(() => {
    // DESAFIO:
    // Atualize a mensagem baseado no valor do contador:
    // - Se for 0: "Zerado!"
    // - Se for 10: "Limite máximo!"
    // - Qualquer outro valor: "Contando: X" (onde X é o contador)
    //
    // Dicas:
    // - Use setMensagem() para definir o texto.
    // - Use if/else if/else para verificar as condições.
    // - A variável 'contador' tem o valor atual.
  }, [
    // DESAFIO: complete a dependência aqui
    // Dica: qual variável esse useEffect precisa observar?
  ]);

  return (
    <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-6">
      <h3 className="mb-1 text-lg font-bold text-cyan-400">
        Exercício 1: Contador com Limite (0–10)
      </h3>
      <p className="mb-4 text-sm text-white/50">
        Implemente incrementar, decrementar e resetar. O useEffect deve atualizar a mensagem.
      </p>

      <div className="mb-4 rounded bg-black/50 p-4 text-center">
        <p className="text-4xl font-bold">{contador}</p>
        <p className="mt-2 text-sm text-white/60">{mensagem}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={decrementar}
          className="rounded border border-cyan-500/50 px-4 py-2 text-sm transition hover:bg-cyan-500/20"
        >
          − Diminuir
        </button>
        <button
          onClick={resetar}
          className="rounded border border-white/20 px-4 py-2 text-sm transition hover:bg-white/10"
        >
          Resetar
        </button>
        <button
          onClick={incrementar}
          className="rounded border border-cyan-500/50 px-4 py-2 text-sm transition hover:bg-cyan-500/20"
        >
          + Aumentar
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// EXERCÍCIO 2: Lista de compras
// ─────────────────────────────────────────────
function Exercicio2_ListaCompras() {
  const [itens, setItens] = useState<string[]>([]);
  const [novoItem, setNovoItem] = useState("");
  const [total, setTotal] = useState("Nenhum item na lista");

  function adicionarItem() {
    // DESAFIO:
    // Adicione o novoItem à lista de itens.
    //
    // Dicas:
    // - Primeiro verifique se novoItem.trim() não é vazio.
    // - Use setItens() com o operador spread [...itens, novoValor].
    // - Depois limpe o input com setNovoItem("").
  }

  function removerItem(index: number) {
    // DESAFIO:
    // Remova o item na posição 'index' da lista.
    //
    // Dicas:
    // - Use setItens() com filter().
    // - No filter, compare o índice: (_, i) => i !== index
    // - Isso cria uma lista nova SEM o item removido.
  }

  useEffect(() => {
    // DESAFIO:
    // Atualize o 'total' com a quantidade de itens na lista.
    // - Se a lista estiver vazia: "Nenhum item na lista"
    // - Se tiver itens: "X item(ns) na lista"
    //
    // Dicas:
    // - Use setTotal() para definir a mensagem.
    // - Use itens.length para saber quantos itens tem.
    // - Use uma condição (if/else ou ternário) para escolher a mensagem.
  }, [
    // DESAFIO: qual variável observar?
  ]);

  return (
    <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-6">
      <h3 className="mb-1 text-lg font-bold text-green-400">
        Exercício 2: Lista de Compras
      </h3>
      <p className="mb-4 text-sm text-white/50">
        Adicione e remova itens. O useEffect deve contar quantos itens tem.
      </p>

      <div className="mb-4 rounded bg-black/50 p-3 text-center text-sm">
        🛒 {total}
      </div>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={novoItem}
          onChange={(e) => setNovoItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && adicionarItem()}
          placeholder="Ex: Arroz, Feijão..."
          className="flex-1 rounded border border-green-500/30 bg-transparent px-3 py-2 text-sm outline-none focus:border-green-500"
        />
        <button
          onClick={adicionarItem}
          className="rounded border border-green-500/50 px-4 py-2 text-sm transition hover:bg-green-500/20"
        >
          Adicionar
        </button>
      </div>

      <ul className="space-y-2">
        {itens.length === 0 && (
          <li className="text-sm text-white/30">Lista vazia...</li>
        )}
        {itens.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between rounded bg-black/30 px-3 py-2 text-sm"
          >
            <span>{item}</span>
            <button
              onClick={() => removerItem(index)}
              className="text-red-400 transition hover:text-red-300"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────
// EXERCÍCIO 3: Conversor de temperatura
// ─────────────────────────────────────────────
function Exercicio3_Temperatura() {
  const [celsius, setCelsius] = useState(0);
  const [fahrenheit, setFahrenheit] = useState("32");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    // DESAFIO:
    // Converta celsius para fahrenheit e atualize a descrição.
    //
    // Fórmula: F = (C × 9/5) + 32
    //
    // Dicas:
    // - Calcule o valor de fahrenheit usando a fórmula acima.
    // - Use setFahrenheit() para exibir o resultado (como string).
    // - Use setDescricao() para mostrar uma mensagem:
    //     celsius < 0   → "Congelante! 🥶"
    //     celsius < 15  → "Frio 🧥"
    //     celsius < 25  → "Agradável 😊"
    //     celsius >= 25 → "Quente! 🔥"
  }, [
    // DESAFIO: qual variável observar?
  ]);

  return (
    <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-6">
      <h3 className="mb-1 text-lg font-bold text-orange-400">
        Exercício 3: Conversor °C → °F
      </h3>
      <p className="mb-4 text-sm text-white/50">
        Mova o slider e o useEffect deve converter automaticamente.
      </p>

      <div className="mb-4 rounded bg-black/50 p-4 text-center">
        <p className="text-3xl font-bold">{celsius}°C</p>
        <p className="text-2xl text-orange-400">{fahrenheit}°F</p>
        <p className="mt-2 text-lg">{descricao}</p>
      </div>

      <input
        type="range"
        min="-20"
        max="50"
        value={celsius}
        onChange={(e) => setCelsius(Number(e.target.value))}
        className="w-full"
      />
      <div className="mt-1 flex justify-between text-xs text-white/40">
        <span>-20°C</span>
        <span>50°C</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// EXERCÍCIO 4: Cronômetro
// ─────────────────────────────────────────────
function Exercicio4_Cronometro() {
  const [segundos, setSegundos] = useState(0);
  const [rodando, setRodando] = useState(false);

  useEffect(() => {
    // DESAFIO:
    // Se 'rodando' for true, crie um intervalo que incrementa 'segundos' a cada 1 segundo.
    // Se 'rodando' for false, não faça nada.
    //
    // Dicas:
    // - Use if (!rodando) return; para sair cedo se não estiver rodando.
    // - Use setInterval(() => { ... }, 1000) para rodar a cada 1 segundo.
    // - Dentro do setInterval, use setSegundos(s => s + 1) (forma funcional!).
    // - IMPORTANTE: retorne uma função de limpeza: return () => clearInterval(id)
    //   (isso impede que intervalos se acumulem quando o estado muda).
  }, [
    // DESAFIO: qual variável observar?
  ]);

  function formatarTempo(totalSegundos: number) {
    const min = Math.floor(totalSegundos / 60);
    const seg = totalSegundos % 60;
    return `${String(min).padStart(2, "0")}:${String(seg).padStart(2, "0")}`;
  }

  function toggleRodando() {
    // DESAFIO:
    // Alterne entre rodando e parado.
    //
    // Dicas:
    // - Use setRodando() com o valor oposto do atual.
    // - O operador ! inverte um booleano: !true = false, !false = true.
  }

  function resetarCronometro() {
    // DESAFIO:
    // Pare o cronômetro e volte os segundos para 0.
    //
    // Dicas:
    // - Use setRodando(false) para parar.
    // - Use setSegundos(0) para zerar.
  }

  return (
    <div className="rounded-lg border border-pink-500/30 bg-pink-500/5 p-6">
      <h3 className="mb-1 text-lg font-bold text-pink-400">
        Exercício 4: Cronômetro
      </h3>
      <p className="mb-4 text-sm text-white/50">
        Use useEffect com setInterval para contar segundos. Não esqueça do cleanup!
      </p>

      <div className="mb-4 rounded bg-black/50 p-4 text-center">
        <p className="font-mono text-5xl font-bold">{formatarTempo(segundos)}</p>
        <p className="mt-2 text-sm text-white/40">
          {rodando ? "⏱ Rodando..." : "⏸ Parado"}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={toggleRodando}
          className={`rounded px-4 py-2 text-sm transition ${
            rodando
              ? "border border-red-500/50 hover:bg-red-500/20"
              : "border border-green-500/50 hover:bg-green-500/20"
          }`}
        >
          {rodando ? "⏸ Pausar" : "▶ Iniciar"}
        </button>
        <button
          onClick={resetarCronometro}
          className="rounded border border-white/20 px-4 py-2 text-sm transition hover:bg-white/10"
        >
          🔄 Resetar
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// EXERCÍCIO 5: Busca com filtro
// ─────────────────────────────────────────────
function Exercicio5_Filtro() {
  const frutas = [
    "Maçã", "Banana", "Laranja", "Uva", "Manga",
    "Abacaxi", "Morango", "Melancia", "Pêra", "Kiwi",
    "Limão", "Goiaba", "Mamão", "Cereja", "Amora",
  ];

  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState<string[]>(frutas);
  const [mensagemBusca, setMensagemBusca] = useState("");

  useEffect(() => {
    // DESAFIO:
    // Filtre a lista de frutas baseado no texto de busca.
    //
    // Dicas:
    // - Se busca.trim() estiver vazio, mostre TODAS as frutas: setResultados(frutas).
    // - Senão, use frutas.filter() para encontrar frutas que incluem o texto.
    // - Use .toLowerCase() em ambos os lados para ignorar maiúsculas/minúsculas.
    //   Ex: fruta.toLowerCase().includes(busca.toLowerCase())
    // - Atualize a mensagem: setMensagemBusca(`X fruta(s) encontrada(s)`)
  }, [
    // DESAFIO: qual variável observar?
  ]);

  return (
    <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 p-6">
      <h3 className="mb-1 text-lg font-bold text-violet-400">
        Exercício 5: Busca com Filtro
      </h3>
      <p className="mb-4 text-sm text-white/50">
        Digite para filtrar a lista de frutas. O useEffect deve reagir ao texto.
      </p>

      <input
        type="text"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar fruta..."
        className="mb-2 w-full rounded border border-violet-500/30 bg-transparent px-3 py-2 text-sm outline-none focus:border-violet-500"
      />

      <p className="mb-3 text-xs text-white/40">{mensagemBusca}</p>

      <div className="flex flex-wrap gap-2">
        {resultados.length === 0 && (
          <p className="text-sm text-white/30">Nenhuma fruta encontrada...</p>
        )}
        {resultados.map((fruta) => (
          <span
            key={fruta}
            className="rounded-full bg-violet-500/20 px-3 py-1 text-sm"
          >
            {fruta}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL DA PRÁTICA
// ─────────────────────────────────────────────
function PraticaAula() {
  return (
    <div className="min-h-screen bg-black p-6 text-white md:p-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold">
          🎯 Prática — Sua Vez de Codar!
        </h1>
        <p className="mb-2 text-white/60">
          A interface está pronta. Os estados existem.
          <strong> Complete a lógica</strong> nos lugares marcados com
          <code className="mx-1 rounded bg-white/10 px-2 py-0.5 text-cyan-400">
            // DESAFIO:
          </code>
        </p>
        <p className="mb-8 text-sm text-white/40">
          Dificuldade: do mais fácil ao mais difícil. Boa sorte!
        </p>

        <div className="space-y-8">
          <Exercicio1_Contador />
          <Exercicio2_ListaCompras />
          <Exercicio3_Temperatura />
          <Exercicio4_Cronometro />
          <Exercicio5_Filtro />
        </div>

        <div className="mt-10 rounded-lg border-2 border-white/30 bg-white/10 p-6 text-center">
          <p className="text-lg font-bold">💡 Dica geral:</p>
          <p className="mt-2 text-white/70">
            Se algo não funcionar, abra o <strong>Console do navegador</strong> (F12)
            e leia o erro. O React sempre te diz o que está errado!
          </p>
        </div>

        <p className="mt-8 pb-8 text-center text-xs text-white/30">
          Prática interativa — useState + useEffect
        </p>
      </div>
    </div>
  );
}

export default PraticaAula;
