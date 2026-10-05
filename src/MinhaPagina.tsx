import { useState } from "react";

function MinhaPagina() {
  const itens = [
    {
      id: 1,
      emoji: "🐉",
      nome: "Mortal Kombat",
      descricao: "Jogar Mortal Kombat com os de verdade.",
      nota: 4,
      genero: "Luta",
      plataforma: "Console / PC",
      ano: 1992,
      detalhes: [
        "Luta 1 contra 1 com combos e fatalities.",
        "Personagens icônicos como Scorpion e Sub-Zero.",
        "Melhor jogado com amigos no mesmo sofá.",
        "Conheci esse jogo através do meu tio,era raro ele deixar eu ganhar,mas esse momento era especial para mim,passar um tempo com alguém que eu não tinha tanta entimidade."
      ],
    },
    {
      id: 2,
      emoji: "🥋",
      nome: "Shadow Fight 2",
      descricao: "Jogar Shadow Fight 2 no silêncio.",
      nota: 3,
      genero: "Luta / RPG",
      plataforma: "Celular",
      ano: 2014,
      detalhes: [
        "Luta em silhueta com armas e magias.",
        "Você evolui o personagem ao longo da história.",
        "Bom para jogar sozinho, com calma.",
        "Dscobri esse jogo com um parceiro meu (confesso que fui viciado por um tempinho)"
      ],
    },
    {
      id: 3,
      emoji: "🚓",
      nome: "Grand Theft Auto V",
      descricao: "pegar 5 estrelas no Grand Theft Auto V.",
      nota: 5,
      genero: "Ação / Mundo aberto",
      plataforma: "Console / PC",
      ano: 2013,
      detalhes: [
        "Mundo aberto enorme para explorar.",
        "Três protagonistas: Michael, Franklin e Trevor.",
        "Missões, perseguições e caos com 5 estrelas.",
      ],
    },
    {
      id: 4,
      emoji: "👑",
      nome: "Clash Royale",
      descricao: "Ser campeão no Clash Royale.",
      nota: 4,
      genero: "Estratégia",
      plataforma: "Celular",
      ano: 2016,
      detalhes: [
        "Batalhas rápidas de cartas em tempo real.",
        "Objetivo: destruir as torres do adversário.",
        "Subir de troféus e montar o melhor deck.",
      ],
    },
  ];

  const [jogoAberto, setJogoAberto] = useState<(typeof itens)[number] | null>(
    null,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-black p-8 text-white">
      <h1 className="text-4xl font-graffiti">Meus Jogos Favoritos 🎮</h1>
      <p className="mt-2 text-gray-300">Clique em um jogo para ver mais detalhes.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {itens.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setJogoAberto(item)}
            className="rounded-2xl bg-gray-900 p-6 text-left shadow-lg transition hover:scale-105 hover:bg-gray-800"
          >
            <p className="text-5xl">{item.emoji}</p>
            <h2 className="mt-4 text-2xl font-bold">{item.nome}</h2>
            <p className="mt-2 text-gray-300">{item.descricao}</p>
            <p className="mt-4">{"⭐".repeat(item.nota)}</p>
          </button>
        ))}
      </div>

      {jogoAberto && (
        <div className="fixed inset-0 z-10 flex items-start justify-center overflow-y-auto bg-black/70 p-4">
          <div className="my-8 w-full max-w-md rounded-2xl bg-gray-900 p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setJogoAberto(null)}
              className="mb-4 rounded-xl bg-red-700 px-4 py-2 font-bold hover:bg-red-600"
            >
              Fechar
            </button>
            <p className="text-5xl">{jogoAberto.emoji}</p>
            <h2 className="mt-4 text-3xl font-bold">{jogoAberto.nome}</h2>
            <p className="mt-2 text-gray-300">{jogoAberto.descricao}</p>

            <ul className="mt-6 space-y-2 text-sm text-gray-200">
              <li>
                <strong>Gênero:</strong> {jogoAberto.genero}
              </li>
              <li>
                <strong>Plataforma:</strong> {jogoAberto.plataforma}
              </li>
              <li>
                <strong>Ano:</strong> {jogoAberto.ano}
              </li>
              <li>
                <strong>Nota:</strong> {jogoAberto.nota} {"⭐".repeat(jogoAberto.nota)}
              </li>
            </ul>

            <h3 className="mt-6 text-lg font-bold">Mais sobre o jogo</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-200">
              {jogoAberto.detalhes.map((detalhe) => (
                <li key={detalhe}>{detalhe}</li>
              ))}
            </ul>

          </div>
        </div>
      )}

      <footer className="mt-12 text-center text-gray-500">
        Feito por bs._.ryann
      </footer>
    </div>
  );
}

export default MinhaPagina;
