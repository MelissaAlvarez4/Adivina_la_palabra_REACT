import React from 'react';
import '../../CSS/words.css';
import { useSelector } from 'react-redux';
import Word from './Word';
import Loading from './Loading';

function Words() {
    const { isLoading: gameLoading } = useSelector(state => state.game);
    const { isLoading: slotsLoading, words } = useSelector(state => state.slots);

    return (
        <div className='words'>
            {(gameLoading || slotsLoading) && <Loading/>}

            <div className={`container${gameLoading || slotsLoading ? ' faded' : ''}`}>
                {words.map(word => (
                    <Word key={word.id} id={word.id} />
                ))}
            </div>
            
        </div>
    )
}

export default Words;