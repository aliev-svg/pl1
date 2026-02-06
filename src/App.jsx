import Header from './components/Header'
import { useSelector } from 'react-redux'

function App() {
  const movies = useSelector((state) => state.movies.movies)

  return (
    <div>
      <Header />

      <div style={{ padding: '40px' }}>
        <h1>Список фильмов 🎬</h1>

        <ul>
          {movies.map((movie, index) => (
            <li key={index}>{movie}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
