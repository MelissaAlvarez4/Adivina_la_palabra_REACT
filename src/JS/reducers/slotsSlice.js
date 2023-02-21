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
                throw new Error();
            }
            return data.valid;
        } catch (error) {
            throw new Error('La palabra no está en la lista');
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
            return [data.status, position, letter];

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
            state.selectedSlot = action.payload;
        },
        selectKey:(state, action) => {
            if(state.selectedSlot !== null) {
                state.letters[state.selectedSlot] = action.payload;
                const slot = findFirstNullIndex(state.letters);
                state.selectedSlot = slot === -1 ? null : slot;
            }
        },
        deleteLetter: (state) => {  
            if(state.selectedSlot !== null) {
                if(state.letters[state.selectedSlot] !== null) {
                    state.letters[state.selectedSlot] = null;
                } else {
                    state.letters[state.selectedSlot-1] = null;
                }
            } else {
                state.letters[4] = null;
            }
            state.selectedSlot = findFirstNullIndex(state.letters);
        },
        setError: (state, action) => {
            state.error.show = true;
            state.error.errorMessage = action.payload;
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
                state.validWord = action.payload;
            })
            .addCase(checkWords.rejected, (state, action) => {
                state.isLoading = false;
                state.error.show = true;
                state.error.errorMessage = action.error.message;
            })
            .addCase(checkLetters.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkLetters.fulfilled, (state, action) => {
                state.isLoading = false;
                state.letterStatus[action.payload[1]] = action.payload[0];
            })
            .addCase(checkLetters.rejected, (state, action) => {
                state.isLoading = false;
            });
    }
});

export const { selectSlot, selectKey, deleteLetter, setError } = slotsSlice.actions;

export default slotsSlice.reducer;