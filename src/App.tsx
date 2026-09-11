/*
 * ═══════════════════════════════════════════════════════════════
 *  EDUCAR+ — Projeto: ToDo List (lista de tarefas)
 * ═══════════════════════════════════════════════════════════════
 *
 *  Este arquivo é a tela inteira do seu app.
 *  Hoje ele só mostra um "Olá, mundo!". A missão é transformar
 *  isso numa lista de tarefas VISUAL (só a aparência por enquanto).
 *
 *  ANTES DE COMEÇAR — confira se o app está rodando:
 *    1. Abra o terminal do Cursor (Ctrl + ' ou menu Terminal).
 *    2. Confira a pasta: o terminal precisa estar DENTRO de "educar-plus".
 *       Dica: rode `ls` (ou `dir` no Windows) e veja se aparece "package.json".
 *       Se não aparecer, use `cd educar-plus` até chegar lá.
 *    3. Rode `npm install` (só na primeira vez).
 *    4. Rode `npm run dev` e abra o link que aparece (http://localhost:5173).
 *
 *  Se aparecer "ENOENT: no such file or directory, package.json"
 *  → você está na pasta errada. Volte no passo 2.
 *
 *  Se aparecer "'vite' is not recognized" ou "vite: not found"
 *  → você pulou o `npm install`. Volte no passo 3.
 */

/*
 * ┌─────────────────────────────────────────────────────────────┐
 * │  O QUE A TELA PRECISA TER                                    │
 * │                                                               │
 * │  1. Um título (ex.: "Minhas tarefas")                         │
 * │  2. Um campo de texto (input) + um botão "Adicionar"          │
 * │  3. A lista de tarefas, uma embaixo da outra                  │
 * │     Cada tarefa mostra: o texto + um botão "Remover"          │
 * └─────────────────────────────────────────────────────────────┘
 *
 *  Por enquanto os botões NÃO precisam funcionar. Só aparecer.
 */

/*
 * DICA 1 — De onde vêm as tarefas?
 *
 *  Crie um array com algumas tarefas de exemplo, usando const.
 *  Lembra da aula de arrays? Algo assim:
 *
 *    const tasks = ["Estudar React", "Fazer exercício", "Beber água"];
 *
 *  Ele pode ficar aqui em cima, FORA da função App, ou dentro dela
 *  (antes do return). Os dois lugares funcionam.
 *
 *  Erro comum: escrever `const tasks = [...]` DEPOIS do return.
 *  Nada depois do return é executado.
 */

/*
 * DICA 2 — Como mostrar cada tarefa na tela?
 *
 *  Use o .map() no array (a gente já usou em aula):
 *
 *    {tasks.map((task) => (
 *      <li key={task}>{task}</li>
 *    ))}
 *
 *  Erros comuns:
 *   - Esquecer as chaves { } em volta do .map() dentro do JSX.
 *   - Esquecer o `key`. O app funciona, mas o console mostra um aviso
 *     vermelho: "Each child in a list should have a unique key prop".
 *   - Usar ( ) em vez de { } pra abrir JavaScript dentro do HTML.
 */

/*
 * DICA 3 — Erros de JSX que travam a tela inteira
 *
 *  - Em React é className, não class.
 *  - Toda tag precisa fechar: <input /> e não <input>.
 *  - O return só pode devolver UM elemento. Se tiver vários,
 *    envolva tudo numa <div> ou num fragmento <> </>.
 *  - Estilo com Tailwind: className="text-2xl font-bold" (já está instalado).
 *
 *  Quando a tela ficar branca ou vermelha: leia a mensagem de erro.
 *  Ela sempre diz o ARQUIVO e a LINHA. Vá direto lá.
 */

function App() {
  // DICA 1 entra aqui (ou lá em cima, fora da função). ↑

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      {/* Troque o Olá, mundo pelo título da sua lista. */}
      <h1 className="text-2xl font-bold">Olá, mundo!</h1>

      {/* Aqui vai o input + botão "Adicionar" (item 2 da lista lá em cima). */}

      {/* Aqui vai a <ul> com o .map() da DICA 2. */}
    </div>
  );
}

export default App;
