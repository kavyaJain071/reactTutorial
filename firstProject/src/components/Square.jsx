function Square({ val, onClick }) {
  return (
    <button
      type="button"
      className={`aspect-square rounded-xl bg-white text-5xl font-black shadow-sm transition hover:scale-[1.02] hover:bg-cyan-50 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:focus:ring-cyan-900 ${val === "X" ? "text-cyan-600 dark:text-cyan-400" : "text-fuchsia-600 dark:text-fuchsia-400"}`}
      onClick={onClick}
    >
      {val}
    </button>
  );
}

export default Square;