import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectKey, deleteLetter, checkWords, checkLetters, setError, setStates, setLoading} from '../reducers/slotsSlice';

function Key(props) {
    const { value, command, position} = props;
    const word = useSelector(state => state.slots.letters.join(''));
    const gameId = useSelector((state) => state.game.id);
    const letterStatus = useSelector((state) => state.slots.letterStatus);
    const colors = useSelector((state) => state.slots.colors);
    const [color, setColor] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        letterStatus.forEach(el => {
        if (el.letter === value) {
            setColor(el.color);
        }
        });
    }, [letterStatus, value]);


    const handleCompleteWord = async () => {
        if (word.length === 5) {
            try {
                const valid = await dispatch(checkWords(word))
                if (valid.payload) {
                    const letterPromises = Array.from(word).map((letter, position) => {
                        return dispatch(checkLetters({gameId, letter, position}));
                    });
                    Promise.all(letterPromises)
                        .then(response => {
                            dispatch(setLoading(true));
                            response.forEach((el, index) => {
                                const color = colors[el.payload[0]];
                                const letter = el.payload[1];
                                dispatch(setStates({index, color, letter}))
                            });
                        }).catch((error) => {
                            console.log(error);
                        }).finally(() => dispatch(setLoading(false)));
                    
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
        <div className={`${command ? 'command' : 'key'} ${color}`} onClick={handleClick}>{value}</div>
    );
}

export default React.memo(Key);