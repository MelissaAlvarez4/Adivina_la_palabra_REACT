import React from 'react';
import '../../CSS/words.css';
import Word from './Word';
import Loading from './Loading';
import { useSelector } from 'react-redux';

function Words() {
    const gameLoading = useSelector(state => state.game.isLoading);
    const slotsLoading = useSelector(state => state.slots.isLoading);

    return (
        <div className='words'>
            <div className='container'>
                <Word/>
                {(gameLoading || slotsLoading) && <Loading/>}
            </div>
        </div>
    )
}

export default Words;