import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectKey, deleteLetter, checkWords, checkLetters, setError} from '../reducers/slotsSlice';

function Key(props) {
    const { value, command, position} = props;
    const word = useSelector(state => state.slots.letters.join(''));
    const gameId = useSelector((state) => state.game.id);
    const letterStatus = useSelector((state) => state.slots.letterStatus);
    const dispatch = useDispatch();


    const handleCompleteWord = async () => {
        if (word.length === 5) {
            try {
                const valid = await dispatch(checkWords(word))
                if (valid) {
                    const letterPromises = Array.from(word).map((letter, position) => {
                    return dispatch(checkLetters({gameId, letter, position}));
                    });
                    const letterResponses = await Promise.all(letterPromises);
                }
            } catch (error) {
                throw new Error(error)
            }
        } else {
            dispatch(setError('No hay suficientes letras'))
        }
    }

    const handleDeleteLetter = () => {
        dispatch(deleteLetter());
    }

    const handleSelectKey = () => {
        dispatch(selectKey(value));
    }

    const handleClick = () => {
        if (command && position === 0) {
            handleCompleteWord();
        } else if (command && position === 8) {
            handleDeleteLetter();
        } else {
            handleSelectKey();
        }
    }

    return (
        <div className={`${command ? 'command' : 'key'}`} onClick={handleClick}>{value}</div>
    );
}

export default React.memo(Key);