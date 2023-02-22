import React, { useState, useEffect } from 'react';
import { INCOMPLETE, WINNER, LOSER } from '../constants';
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
    const { words, colors } = useSelector(state => state.slots);
    const gameId = useSelector((state) => state.game.id);
    const [color, setColor] = useState('');
    const dispatch = useDispatch();


    useEffect(() => {
        words[words.length-1].letterStatus.forEach(el => {
            if (el.letter === value) {
                if(color !== 'green') setColor(el.color)
            }
        });
    }, [words, value, color]);

    const checkLettersForWord = async (word) => {
        const letterPromises = Array.from(word).map((letter, position) => {
            return dispatch(checkLetters({ gameId, letter, position }));
        });

        return Promise.all(letterPromises);
    };
    
    const handleResponse = (response) => {
        dispatch(setLoading(true));
        response.forEach(({ payload: [colorCode, letter] }, index) => {
            const color = colors[colorCode];
            dispatch(setStates({ index, color, letter }));
        });

        if (response.every(({ payload: [status] }) => status === 'in position')) {
            dispatch(setResult(WINNER));
        } else {
            if (words.length < 6) {
                dispatch(setWords({id: words.length,letters: Array(5).fill(null),letterStatus: []}));
                dispatch(selectSlot({ index: 0, word: words.length }));
            } else {
                dispatch(setResult(LOSER));
            }
        }
        dispatch(setLoading(false));
    };


    const handleCompleteWord = async () => {
        const word = words[words.length - 1].letters.join('');
        let response;
        if (word.length !== 5) {
            dispatch(setError(INCOMPLETE));
            return;
        }
        try {
            const valid = await dispatch(checkWords(word));
            if (!valid.payload) return;
            response = await checkLettersForWord(word);
            handleResponse(response);
        } catch (error) {
            throw new Error(error);
        }
    };


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