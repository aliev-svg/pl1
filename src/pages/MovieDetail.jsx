import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch("/movies.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((m) => m.id === Number(id));
        setMovie(found);
      });
  }, [id]);

  if (!movie) return <h2>Фильм не найден...</h2>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>Год выпуска: {movie.year}</p>
      <p>{movie.description}</p>

      <a href="/movies">← Назад</a>
    </div>
  );
}

export default MovieDetail;
