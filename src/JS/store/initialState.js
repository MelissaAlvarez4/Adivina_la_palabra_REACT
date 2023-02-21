export const initialState = {
    game: {
        id: null,
        apiError: null,
        message: false,
        isLoading: false
    },
    slots: {
        letters: Array(5).fill(null),
        colors: {
            'wrong': 'gray',
            'in word': 'yellow',
            'in position': 'green'
        },
        selectedSlot: 0,
        error: {
            show: false,
            errorMessage: null
        },
        letterStatus: [],
        isLoading: false
    }
};