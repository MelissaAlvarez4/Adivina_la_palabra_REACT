import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // define el estado inicial aquí
};

const slice = createSlice({
  name: 'nombre_del_reducer',
  initialState,
  reducers: {
    // define tus reducers aquí
  }
});

export const { actions, reducer } = slice;