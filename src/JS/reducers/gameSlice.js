import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { initialState } from '../store/initialState';

const PATH = 'https://adivina-palabra.fly.dev';

export const startGame = createAsyncThunk(
  'game/startGame',
    async () => {
      try {
        const response = await fetch(`${PATH}/new`, { method: 'POST' });
        const data = await response.json();

        if (!data.id) {
          throw new Error();
        }
        return data.id;

      } catch (error) {
        throw new Error('Error initializing game: 404');
      }
  }
);


export const gameSlice = createSlice({
  name: 'game',
  initialState: initialState.game,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startGame.pending, (state) => {
        state.isLoading = true;
        state.message = false;
        state.error = null;
      })
      .addCase(startGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = false;
        state.id = action.payload;
      })
      .addCase(startGame.rejected, (state, action) => {
        state.isLoading = false;
        state.message = true;
        state.apiError = action.error.message;
      });
  }
});

export default gameSlice.reducer;