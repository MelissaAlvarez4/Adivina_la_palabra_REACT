import React from 'react';
import '../../CSS/game.css';
import Words from './Words'
import Keyboard from './Keyboard';
import Error from './Error';

function Game() {
    return (
        <div className='game'>
            {/* <div className="message">Perdiste</div> */}
            <div className='board'>
                <h1>Adivina la palabra</h1>
                <Words/>
                <Keyboard/>
                <Error/>
            </div>
        </div>
    )
}

export default Game;