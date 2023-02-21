export const initialState = {
    game: {
        id: null,
        apiError: null,
        message: false,
        isLoading: false
    },
    slots: {
        letters: Array(5).fill(null),
        color: {
            'wrong': 'gray',
            'in word': 'yellow',
            'in position': 'green'
        },
        selectedSlot: null,
        error: {
            show: false,
            errorMessage: null
        },
        validWord: null,
        letterStatus: [],
        isLoading: false
    }
};