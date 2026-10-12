import "./App.css";
import { useEffect, useState } from "react";
import Board from "./components/Board";
import { useTheme } from "./context/ThemeContext";

function App() {
  const [board, setBoard] = useState(() => Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(3);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [timedOutPlayer, setTimedOutPlayer] = useState(null);
  const { isDark, toggleTheme } = useTheme();

  //if winner or isDraw is set, return and do not set a timer
  //set a  timer of 3 sec when isXTurn changes and if winner or isDraw is not set
  //if timer reaches 0, set the winner to the other player and set timedOutPlayer to the current player
  //destroy the timer when the component unmounts and when isXTurn changes
  useEffect(() => {
    if (winner || isDraw) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((seconds) => {
        if (seconds === 1) {
          const currentPlayer = isXTurn ? "X" : "O";
          setTimedOutPlayer(currentPlayer);
          setWinner(currentPlayer === "X" ? "O" : "X");
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isXTurn, winner, isDraw]);

  //reset the game state when the restart button is clicked
  function restartGame() {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setSecondsLeft(3);
    setWinner(null);
    setIsDraw(false);
    setTimedOutPlayer(null);
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 sm:py-12">
      <div className="mx-auto max-w-xl">
        <header className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-400">
              Two player game
            </p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              Tic-Tac-Toe Arena
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Place your mark before the three-second timer runs out.
            </p>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-500 dark:border-slate-700 dark:bg-slate-900"
            aria-label="Toggle color theme"
          >
            {isDark ? "Light" : "Dark"}
          </button>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 sm:p-8">
          <div className="mb-6 flex items-center justify-between rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Current turn</p>
              <p className="text-2xl font-black">
                Player{" "}
                <span className={isXTurn ? "text-cyan-600 dark:text-cyan-400" : "text-fuchsia-600 dark:text-fuchsia-400"}>
                  {isXTurn ? "X" : "O"}
                </span>
              </p>
            </div>
            <div className={`text-right ${secondsLeft === 1 ? "text-rose-500" : ""}`}>
              <p className="text-sm text-slate-500 dark:text-slate-400">Time left</p>
              <p className="text-3xl font-black tabular-nums">{secondsLeft}s</p>
            </div>
          </div>

          <Board
            game={board}
            setGame={setBoard}
            isXTurn={isXTurn}
            setIsXTurn={setIsXTurn}
            setWinner={setWinner}
            setIsDraw={setIsDraw}
            isGameOver={Boolean(winner || isDraw)}
            setSecondsLeft={setSecondsLeft}
          />

          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="min-h-7 text-center text-lg font-bold">
              {winner
                ? timedOutPlayer
                  ? `Time's up! Player ${winner} wins.`
                  : `Player ${winner} wins!`
                : isDraw
                  ? "It's a draw!"
                  : `Player ${isXTurn ? "X" : "O"}'s move`}
            </p>
            {(winner || isDraw) && (
              <button
                type="button"
                onClick={restartGame}
                className="rounded-xl bg-cyan-600 px-5 py-3 font-bold text-white transition hover:bg-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
              >
                Play again
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
