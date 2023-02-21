import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    selectKey, 
    deleteLetter, 
    checkWords, 
    checkLetters, 
    setError, 
    setStates, 
    setLoading, 
    setWords,
    selectSlot,
    setResult } from '../reducers/slotsSlice';

function Key(props) {
    const { value, command, position} = props;
    const words = useSelector(state => state.slots.words);
    const gameId = useSelector((state) => state.game.id);
    const colors = useSelector((state) => state.slots.colors);
    const [color, setColor] = useState('');
    const dispatch = useDispatch();


    useEffect(() => {
        words[words.length-1].letterStatus.forEach(el => {
            if (el.letter === value) {
                if(color !== 'green') setColor(el.color)
            }
        });
    }, [words, value, color]);


    const handleCompleteWord = async () => {
        const word = words[words.length-1].letters.join('');
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
                                dispatch(setStates({index, color, letter}));
                            });
                            if(response.every(el => el.payload[0] === 'in position')) {
                                dispatch(setResult('Has ganado'));
                            } else {
                                if(words.length < 6 ) {
                                    dispatch(setWords({id: words.length, letters: Array(5).fill(null), letterStatus: []}));
                                    dispatch(selectSlot({index: 0, word: words.length}));
                                } else {
                                    dispatch(setResult('Has perdido'));
                                }
                            }
                        }).catch((error) => {
                            console.log('Error: ' + error);
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