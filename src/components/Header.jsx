import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">MyMovies</div>

      <nav className="nav">
        <a href="/">Главная</a>
        <a href="/movies">Фильмы</a>
        <a href="/about">О проекте</a>
      </nav>
    </header>
  );
}

export default Header;
