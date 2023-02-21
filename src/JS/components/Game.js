import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGame } from '../reducers/gameSlice'
import '../../CSS/game.css';
import Words from './Words'
import Keyboard from './Keyboard';
import Error from './Error';

function Game() {
    const dispatch = useDispatch();
    const apiError = useSelector(state=> state.game.apiError);
    const message = useSelector(state => state.game.message);
    const { show }  = useSelector(state => state.slots.error);

    useEffect(() => {
        dispatch(startGame());
    }, [dispatch]);

    return (
        <div className='game'>
            {message && <div className='message'>{apiError}</div>}
            <div className='board'>
                <h1>Adivina la palabra</h1>
                <Words/>
                <Keyboard/>
                {show && <Error/>}
            </div>
        </div>
    )
}

export default Game;