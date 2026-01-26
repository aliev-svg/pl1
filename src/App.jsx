import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from './features/counterSlice'

function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div style={{ padding: '40px' }}>
      <h1>Redux работает 🎉</h1>
      <h2>Число: {count}</h2>

      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())} style={{ marginLeft: '10px' }}>
        -
      </button>
    </div>
  )
}

export default App
