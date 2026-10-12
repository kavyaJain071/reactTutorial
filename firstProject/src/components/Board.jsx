import Square from "./Square";

function Board({
  game,
  setGame,
  isXTurn,
  setIsXTurn,
  setWinner,
  setIsDraw,
  isGameOver,
  setSecondsLeft,
}) {
  function checkWinner(currentGame) {
    const winningCombinations = [
      [0, 1, 2], //rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], //columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], //diagonals
      [2, 4, 6],
    ];

    for (const [a, b, c] of winningCombinations) {
      if (
        currentGame[a] !== null &&
        currentGame[a] === currentGame[b] &&
        currentGame[b] === currentGame[c]
      ) {
        return currentGame[a];
      }
    }

    return null;
  }

  function handleClick(idx) {
    if (game[idx] !== null || isGameOver) return;

    const newGame = [...game];
    newGame[idx] = isXTurn ? "X" : "O";
    const winner = checkWinner(newGame);
    setGame(newGame);

    if (winner) {
      setWinner(winner);
      return;
    }

    if (newGame.every((val) => val !== null)) {
      setIsDraw(true);
      return;
    }

    setIsXTurn((turn) => !turn);
    setSecondsLeft(3);
  }

  return (
    <div className="mx-auto grid max-w-[330px] grid-cols-3 gap-2 rounded-2xl bg-slate-200 p-2 dark:bg-slate-700">
      {game.map((val, idx) => (
        <Square val={val} key={idx} onClick={() => handleClick(idx)} />
      ))}
    </div>
  );
}

export default Board;
