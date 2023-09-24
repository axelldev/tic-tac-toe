export default function WinnerModal({ children, resetGame }) {
  return (
    <section className="winner">
      <div className="text">
        <h2>The winner is</h2>

        <header className="win">{children}</header>

        <footer>
          <button onClick={resetGame}>RESTART</button>
        </footer>
      </div>
    </section>
  );
}
