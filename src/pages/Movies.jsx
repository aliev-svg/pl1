import { useEffect, useState } from "react";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Задержка + загрузка JSON
  useEffect(() => {
    setTimeout(() => {
      fetch("/movies.json")
        .then((res) => res.json())
        .then((data) => {
          setMovies(data);
          setLoading(false);
        });
    }, 1500); // задержка 1.5 сек
  }, []);

  if (loading) {
    return <h2>Загрузка фильмов...</h2>;
  }

  return (
    <div>
      <h1>Список фильмов</h1>

      {movies.map((movie) => (
        <div key={movie.id} style={{ marginBottom: "20px" }}>
          <h3>{movie.title}</h3>
          <p>Год: {movie.year}</p>
          <a href={`/movies/${movie.id}`}>Подробнее</a>
        </div>
      ))}
    </div>
  );
}

export default Movies;
