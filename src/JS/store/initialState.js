export const initialState = {
    game: {
        id: null,
        apiError: null,
        message: false,
        isLoading: false
    },
    slots: {
        words: [{
            id: 0,
            letters: Array(5).fill(null),
            letterStatus: []
        }],
        colors: {
            'wrong': 'grey',
            'in word': 'yellow',
            'in position': 'green'
        },
        selectedSlot: [{
            index: 0,
            word: 0
        }],
        error: {
            show: false,
            errorMessage: null
        },
        isLoading: false,
        result: null,
        message: false
    }
};