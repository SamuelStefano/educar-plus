import { useState, useEffect } from "react";

/*
 * ═══════════════════════════════════════════════════════════════
 *  PRÁTICA: Complete o Código!
 * ═══════════════════════════════════════════════════════════════
 *
 *  Tudo já está quase pronto!
 *  Você só precisa SUBSTITUIR os _____ pelo código certo.
 *
 *  Cada exercício tem uma "COLA" mostrando as opções.
 *  Escolha a certa e substitua!
 */

// ─────────────────────────────────────────────
// EXERCÍCIO 1: Like do Instagram
// Clicou no coração? Aumenta o like!
// ─────────────────────────────────────────────
function Exercicio1_Like() {
  const [curtidas, setCurtidas] = useState(0);
  const [curtiu, setCurtiu] = useState(false);

  /*
   * ┌─────────────────────────────────────┐
   * │  COLA — escolha a opção certa:      │
   * │                                      │
   * │  A) setCurtidas(curtidas + 1)        │
   * │  B) setCurtidas(curtidas - 1)        │
   * │  C) setCurtiu(!curtiu)               │
   * │  D) setCurtiu(true)                  │
   * └─────────────────────────────────────┘
   */

  function darLike() {
    if (curtiu) return; // já curtiu, não faz nada

    // COMPLETE: troque _____ pela opção que AUMENTA as curtidas em 1
    // _____

    // COMPLETE: troque _____ pela opção que marca que o usuário JÁ curtiu
    // _____
  }

  function tirarLike() {
    if (!curtiu) return; // não curtiu, não faz nada

    // COMPLETE: troque _____ pela opção que DIMINUI as curtidas em 1
    // _____

    // COMPLETE: troque _____ pela opção que marca que o usuário NÃO curtiu mais
    // Dica: não é a opção D! Precisa voltar pra false.
    // _____
  }

  return (
    <div className="rounded-lg border border-pink-500/30 bg-pink-500/5 p-6">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs rounded bg-pink-500/20 px-2 py-0.5 text-pink-300">Fácil</span>
        <h3 className="text-lg font-bold text-pink-400">
          Exercício 1: Like do Instagram
        </h3>
      </div>
      <p className="mb-4 text-sm text-white/50">
        Substitua os <code className="text-pink-300">_____</code> pelas opções certas da COLA acima (no código).
      </p>

      <div className="mb-4 flex items-center justify-center gap-6 rounded bg-black/50 p-6">
        <button
          onClick={curtiu ? tirarLike : darLike}
          className="text-5xl transition-transform hover:scale-110 active:scale-95"
        >
          {curtiu ? "❤️" : "🤍"}
        </button>
        <span className="text-3xl font-bold">{curtidas}</span>
      </div>

      <p className="text-xs text-white/40">
        Clique no coração para curtir. Clique de novo para descurtir.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// EXERCÍCIO 2: Placar de Jogo
// Dois times, quem faz mais gol ganha!
// ─────────────────────────────────────────────
function Exercicio2_Placar() {
  const [golsTime1, setGolsTime1] = useState(0);
  const [golsTime2, setGolsTime2] = useState(0);
  const [vencedor, setVencedor] = useState("Empate! ⚖️");

  /*
   * ┌──────────────────────────────────────────────┐
   * │  COLA — use estas peças nos lugares certos:  │
   * │                                               │
   * │  setGolsTime1(golsTime1 + 1)                 │
   * │  setGolsTime2(golsTime2 + 1)                 │
   * │  setGolsTime1(0)                             │
   * │  setGolsTime2(0)                             │
   * │  setVencedor("Time 1 vencendo! 🔵")           │
   * │  setVencedor("Time 2 vencendo! 🔴")           │
   * │  setVencedor("Empate! ⚖️")                    │
   * └──────────────────────────────────────────────┘
   */

  function golTime1() {
    // COMPLETE: aumente os gols do Time 1
    // _____
  }

  function golTime2() {
    // COMPLETE: aumente os gols do Time 2
    // _____
  }

  function resetarPlacar() {
    // COMPLETE: zere os dois placares (precisa de 2 linhas)
    // _____
    // _____
  }

  useEffect(() => {
    // COMPLETE: verifique quem está ganhando e atualize 'vencedor'
    //
    // A lógica é:
    //   se golsTime1 > golsTime2 → "Time 1 vencendo! 🔵"
    //   se golsTime2 > golsTime1 → "Time 2 vencendo! 🔴"
    //   se são iguais            → "Empate! ⚖️"
    //
    // COMPLETE com if / else if / else:

    if (golsTime1 > golsTime2) {
      // _____
    } else if (golsTime2 > golsTime1) {
      // _____
    } else {
      // _____
    }
  }, [golsTime1, golsTime2]); // já preenchido pra você!

  return (
    <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-6">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs rounded bg-blue-500/20 px-2 py-0.5 text-blue-300">Fácil</span>
        <h3 className="text-lg font-bold text-blue-400">
          Exercício 2: Placar de Jogo
        </h3>
      </div>
      <p className="mb-4 text-sm text-white/50">
        Monte o placar! O useEffect já tem o if/else — só falta preencher dentro.
      </p>

      <div className="mb-2 rounded bg-black/50 p-4 text-center">
        <div className="flex items-center justify-center gap-8">
          <div>
            <p className="text-sm text-blue-400">Time 1 🔵</p>
            <p className="text-5xl font-bold">{golsTime1}</p>
          </div>
          <span className="text-2xl text-white/30">✕</span>
          <div>
            <p className="text-sm text-red-400">Time 2 🔴</p>
            <p className="text-5xl font-bold">{golsTime2}</p>
          </div>
        </div>
        <p className="mt-3 text-lg">{vencedor}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={golTime1}
          className="flex-1 rounded border border-blue-500/50 px-4 py-2 text-sm transition hover:bg-blue-500/20"
        >
          ⚽ Gol Time 1
        </button>
        <button
          onClick={resetarPlacar}
          className="rounded border border-white/20 px-4 py-2 text-sm transition hover:bg-white/10"
        >
          🔄
        </button>
        <button
          onClick={golTime2}
          className="flex-1 rounded border border-red-500/50 px-4 py-2 text-sm transition hover:bg-red-500/20"
        >
          ⚽ Gol Time 2
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// EXERCÍCIO 3: Carrinho de Lanche
// Adiciona lanches e vê o total!
// ─────────────────────────────────────────────
function Exercicio3_Carrinho() {
  const [carrinho, setCarrinho] = useState<string[]>([]);
  const [resumo, setResumo] = useState("Carrinho vazio");

  const lanches = [
    { nome: "Hambúrguer 🍔", emoji: "🍔" },
    { nome: "Pizza 🍕", emoji: "🍕" },
    { nome: "Batata Frita 🍟", emoji: "🍟" },
    { nome: "Sorvete 🍦", emoji: "🍦" },
  ];

  /*
   * ┌─────────────────────────────────────────────────────┐
   * │  COLA:                                              │
   * │                                                      │
   * │  Para adicionar item numa lista:                     │
   * │    setCarrinho([...carrinho, novoItem])              │
   * │                                                      │
   * │  Para limpar a lista:                                │
   * │    setCarrinho([])                                   │
   * │                                                      │
   * │  Para contar itens:                                  │
   * │    carrinho.length                                   │
   * │                                                      │
   * │  Para atualizar o resumo:                            │
   * │    setResumo("texto aqui")                           │
   * └─────────────────────────────────────────────────────┘
   */

  function adicionarLanche(nome: string) {
    // COMPLETE: adicione 'nome' ao carrinho
    // Dica: use o spread [...carrinho, nome]
    // _____
  }

  function limparCarrinho() {
    // COMPLETE: esvazie o carrinho (lista vazia = [])
    // _____
  }

  useEffect(() => {
    // COMPLETE: atualize o resumo baseado no carrinho
    //
    // Se carrinho.length === 0 → setResumo("Carrinho vazio")
    // Senão → setResumo("X item(ns) no carrinho")
    //
    // Dica: substitua o X por carrinho.length

    if (carrinho.length === 0) {
      // _____
    } else {
      // _____
    }
  }, [
    // COMPLETE: qual variável o useEffect precisa observar?
    // Dica: qual lista muda quando adicionamos um lanche?
    // _____
  ]);

  return (
    <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-6">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs rounded bg-amber-500/20 px-2 py-0.5 text-amber-300">Médio</span>
        <h3 className="text-lg font-bold text-amber-400">
          Exercício 3: Carrinho de Lanche
        </h3>
      </div>
      <p className="mb-4 text-sm text-white/50">
        Clique nos lanches para adicionar. O useEffect conta quantos tem.
      </p>

      <div className="mb-4 rounded bg-black/50 p-3 text-center text-sm">
        🛒 {resumo}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        {lanches.map((lanche) => (
          <button
            key={lanche.nome}
            onClick={() => adicionarLanche(lanche.nome)}
            className="rounded border border-amber-500/30 p-3 text-left text-sm transition hover:bg-amber-500/10"
          >
            <span className="text-2xl">{lanche.emoji}</span>
            <p className="mt-1">{lanche.nome}</p>
          </button>
        ))}
      </div>

      {/* Mostra os itens no carrinho */}
      <div className="mb-3 flex flex-wrap gap-1">
        {carrinho.map((item, i) => (
          <span key={i} className="rounded bg-amber-500/20 px-2 py-0.5 text-xs">
            {item}
          </span>
        ))}
      </div>

      {carrinho.length > 0 && (
        <button
          onClick={limparCarrinho}
          className="rounded border border-red-500/30 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
        >
          🗑 Limpar carrinho
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// EXERCÍCIO 4: Gerador de Senha
// Slider muda tamanho, useEffect gera a senha!
// ─────────────────────────────────────────────
function Exercicio4_Senha() {
  const [tamanho, setTamanho] = useState(8);
  const [senha, setSenha] = useState("????????");
  const [forca, setForca] = useState("");

  /*
   * ┌──────────────────────────────────────────────────────────┐
   * │  COLA:                                                   │
   * │                                                           │
   * │  Para gerar a senha (já está pronto, só descomente):      │
   * │    const chars = "ABCDEFabcdef0123456789!@#$"             │
   * │    let novaSenha = ""                                     │
   * │    for (let i = 0; i < tamanho; i++) {                    │
   * │      novaSenha += chars[Math.floor(Math.random()          │
   * │                         * chars.length)]                  │
   * │    }                                                      │
   * │    setSenha(novaSenha)                                    │
   * │                                                           │
   * │  Para a força:                                            │
   * │    tamanho < 6  → setForca("Fraca 🔓")                   │
   * │    tamanho < 10 → setForca("Média 🔐")                   │
   * │    tamanho >= 10 → setForca("Forte 💪")                  │
   * └──────────────────────────────────────────────────────────┘
   */

  useEffect(() => {
    // COMPLETE: gere uma senha aleatória com o tamanho do slider
    //
    // Passo 1: descomente as linhas abaixo (tire os // da frente):
    // const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$"
    // let novaSenha = ""
    // for (let i = 0; i < tamanho; i++) {
    //   novaSenha += chars[Math.floor(Math.random() * chars.length)]
    // }
    // setSenha(novaSenha)

    // Passo 2: COMPLETE a força da senha:
    if (tamanho < 6) {
      // _____
    } else if (tamanho < 10) {
      // _____
    } else {
      // _____
    }
  }, [
    // COMPLETE: qual variável observar?
    // Dica: quando o slider muda, o que muda de valor?
    // _____
  ]);

  return (
    <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-6">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs rounded bg-green-500/20 px-2 py-0.5 text-green-300">Médio</span>
        <h3 className="text-lg font-bold text-green-400">
          Exercício 4: Gerador de Senha
        </h3>
      </div>
      <p className="mb-4 text-sm text-white/50">
        Mova o slider e o useEffect gera uma senha automaticamente!
      </p>

      <div className="mb-4 rounded bg-black/50 p-4 text-center">
        <p className="mb-1 font-mono text-2xl tracking-widest text-green-400 break-all">
          {senha}
        </p>
        <p className="text-sm">{forca}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-white/50">4</span>
        <input
          type="range"
          min="4"
          max="20"
          value={tamanho}
          onChange={(e) => setTamanho(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-sm text-white/50">20</span>
      </div>
      <p className="mt-1 text-center text-sm text-white/60">
        Tamanho: <strong>{tamanho}</strong> caracteres
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// EXERCÍCIO 5: Perfil de Rede Social
// Muda o nome e a bio, o preview atualiza!
// ─────────────────────────────────────────────
function Exercicio5_Perfil() {
  const [nome, setNome] = useState("");
  const [bio, setBio] = useState("");
  const [preview, setPreview] = useState("Preencha seu perfil!");
  const [charRestantes, setCharRestantes] = useState(100);

  /*
   * ┌───────────────────────────────────────────────────────┐
   * │  COLA:                                                │
   * │                                                        │
   * │  Para montar o preview:                                │
   * │    setPreview(`${nome} — ${bio}`)                      │
   * │                                                        │
   * │  Para contar caracteres restantes:                     │
   * │    setCharRestantes(100 - bio.length)                  │
   * │                                                        │
   * │  Lembre-se: o useEffect precisa observar               │
   * │  TODAS as variáveis que ele usa dentro!                │
   * └───────────────────────────────────────────────────────┘
   */

  useEffect(() => {
    // COMPLETE: atualize o preview e os caracteres restantes
    //
    // Passo 1: se nome estiver vazio, mostre "Preencha seu perfil!"
    // Passo 2: senão, monte o preview com nome e bio
    // Passo 3: atualize quantos caracteres restam na bio (máximo 100)

    if (nome.trim() === "") {
      setPreview("Preencha seu perfil!");
    } else {
      // COMPLETE: monte o preview juntando nome e bio
      // _____
    }

    // COMPLETE: calcule quantos caracteres restam (100 - tamanho da bio)
    // _____
  }, [
    // COMPLETE: quais variáveis observar? (são 2!)
    // Dica: o preview depende do nome E da bio
    // _____, _____
  ]);

  return (
    <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 p-6">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs rounded bg-violet-500/20 px-2 py-0.5 text-violet-300">Médio</span>
        <h3 className="text-lg font-bold text-violet-400">
          Exercício 5: Perfil de Rede Social
        </h3>
      </div>
      <p className="mb-4 text-sm text-white/50">
        Digite seu nome e bio. O useEffect monta o preview automaticamente.
      </p>

      {/* Preview do perfil */}
      <div className="mb-4 rounded bg-black/50 p-4 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/30 text-2xl">
          {nome ? nome[0]?.toUpperCase() : "?"}
        </div>
        <p className="text-lg font-bold">{nome || "Seu Nome"}</p>
        <p className="text-sm text-white/60">{preview}</p>
      </div>

      {/* Inputs */}
      <div className="space-y-3">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome..."
          className="w-full rounded border border-violet-500/30 bg-transparent px-3 py-2 text-sm outline-none focus:border-violet-500"
        />
        <div>
          <textarea
            value={bio}
            onChange={(e) => {
              if (e.target.value.length <= 100) setBio(e.target.value);
            }}
            placeholder="Sua bio..."
            rows={2}
            className="w-full rounded border border-violet-500/30 bg-transparent px-3 py-2 text-sm outline-none focus:border-violet-500"
          />
          <p className={`text-xs ${charRestantes < 20 ? "text-red-400" : "text-white/40"}`}>
            {charRestantes} caracteres restantes
          </p>
        </div>
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
          🎯 Prática — Complete o Código!
        </h1>
        <p className="mb-2 text-white/60">
          O código já está <strong>quase pronto</strong>!
          Substitua os <code className="mx-1 rounded bg-white/10 px-2 py-0.5 text-cyan-400">_____</code> pelo
          código certo. Cada exercício tem uma <strong>COLA</strong> com as opções.
        </p>
        <p className="mb-8 text-sm text-white/40">
          Abra o arquivo <code className="text-cyan-400">src/PraticaAula.tsx</code> no VS Code e mãos à obra!
        </p>

        <div className="space-y-8">
          <Exercicio1_Like />
          <Exercicio2_Placar />
          <Exercicio3_Carrinho />
          <Exercicio4_Senha />
          <Exercicio5_Perfil />
        </div>

        <div className="mt-10 rounded-lg border-2 border-white/30 bg-white/10 p-6 text-center">
          <p className="text-lg font-bold">💡 Como fazer:</p>
          <div className="mt-3 space-y-2 text-left text-sm text-white/70">
            <p>1. Abra <code className="text-cyan-400">src/PraticaAula.tsx</code> no VS Code</p>
            <p>2. Procure por <code className="text-pink-400">_____</code> (5 underlines)</p>
            <p>3. Leia a <strong>COLA</strong> acima da função</p>
            <p>4. Substitua o <code className="text-pink-400">_____</code> pela opção certa</p>
            <p>5. Salve o arquivo e veja funcionando no navegador!</p>
          </div>
        </div>

        <p className="mt-8 pb-8 text-center text-xs text-white/30">
          Prática interativa — useState + useEffect
        </p>
      </div>
    </div>
  );
}

export default PraticaAula;
