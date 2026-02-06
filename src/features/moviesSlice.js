import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  movies: [
    'Матрица',
    'Интерстеллар',
    'Бойцовский клуб',
    'Властелин колец',
  ],
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
})

export default moviesSlice.reducer
