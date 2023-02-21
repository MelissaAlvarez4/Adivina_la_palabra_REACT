import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { initialState } from '../store/initialState';

const findFirstNullIndex = (array) => array.findIndex((item) => item === null);

const PATH = 'https://adivina-palabra.fly.dev';

export const checkWords = createAsyncThunk(
    'checkWords',
        async (word) => {
        try {
            const response = await fetch(`${PATH}/check/${word}`);
            const data = await response.json();
            if(!data.valid) {
                throw new Error('La palabra no está en la lista');
            }
            return data.valid;
        } catch (error) {
            throw new Error(error);
        }
    }
);

export const checkLetters = createAsyncThunk(
    'slots/checkLetters',
    async ({ gameId, letter, position }) => {
        try {
            const response = await fetch(`${PATH}/guess/${gameId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ position, letter })
            });
            const data = await response.json();

            if (!data.status) {
                throw new Error();
            }
            return [data.status, letter];

        } catch (error) {
            throw new Error(error);
        }
    }
);

export const slotsSlice = createSlice({
    name: 'slots',
    initialState: initialState.slots,
    reducers: {
        selectSlot: (state, action) => {
            state.selectedSlot[action.payload.word] = action.payload;
        },
        selectKey:(state, action) => {
            let selected = state.selectedSlot[state.selectedSlot.length-1];
            if(selected.index !== null) {
                const letters = state.words[selected.word].letters;
                letters[selected.index] = action.payload;
                const slot = findFirstNullIndex(letters);
                selected.index = slot === -1 ? null : slot;
            }
        },
        deleteLetter: (state) => {
            let selected = state.selectedSlot[state.selectedSlot.length-1];  
            let letters = state.words[selected.word].letters;
            if(selected.index !== null) {
                if(letters[selected.index] !== null) {
                    letters[selected.index] = null;
                } else {
                    letters[selected.index-1] = null;
                }
            } else {
                letters[4] = null;
            }
            selected.index = findFirstNullIndex(letters);
        },
        setError: (state, action) => {
            state.error.show = true;
            state.error.errorMessage = action.payload;
        },
        setStates: (state, action) => {
            const letterStatus = state.words[state.words.length-1].letterStatus;
            const { index, color, letter }= action.payload;
            letterStatus[index] = { color: color, letter: letter};
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setWords: (state, action) => {
            state.words.push(action.payload);
        },
        setResult: (state, action) => {
            state.message = true;
            state.result = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkWords.pending, (state) => {
                state.error.show = false;
                state.error.errorMessage = null;
                state.isLoading = true;
            })
            .addCase(checkWords.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error.show = false;
                state.error.errorMessage = null;

            })
            .addCase(checkWords.rejected, (state, action) => {
                state.isLoading = false;
                state.error.show = true;
                state.error.errorMessage = action.error.message;
            })
            .addCase(checkLetters.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkLetters.rejected, (state, action) => {
                state.isLoading = false;
            });
    }
});

export const { selectSlot, selectKey, deleteLetter, setError, setStates, setLoading, setWords, setResult } = slotsSlice.actions;

export default slotsSlice.reducer;