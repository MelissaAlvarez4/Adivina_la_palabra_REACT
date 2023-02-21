import React from 'react';
import '../../CSS/words.css';
import { useDispatch, useSelector } from 'react-redux';
import Word from './Word';
import Loading from './Loading';

function Words() {
    const gameLoading = useSelector(state => state.game.isLoading);
    const slotsLoading = useSelector(state => state.slots.isLoading);
    const words = useSelector(state => state.slots.words);

    return (
        <div className='words'>
            {(gameLoading || slotsLoading) && <Loading/>}
            <div className={`${gameLoading || slotsLoading ? 'container faded' : 'container'}`}>
            {words.map(word => (
                <Word key={word.id} id={word.id} />
            ))}
            </div>
        </div>
    )
}

export default Words;