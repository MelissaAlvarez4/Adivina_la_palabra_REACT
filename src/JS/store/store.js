import { configureStore } from "@reduxjs/toolkit";
import { initialState } from './initialState';
import gameSlice from '../reducers/gameSlice';
import slotsSlice from '../reducers/slotsSlice';

export const store = configureStore({
  reducer: {
    game: gameSlice,
    slots: slotsSlice
  },
  preloadedState: initialState
});

export default store;