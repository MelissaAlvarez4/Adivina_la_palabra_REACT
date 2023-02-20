import React from 'react';
import '../../CSS/words.css';
import Word from './Word';
import Loading from './Loading';

function Words() {
    return (
        <div className='words'>
            <div className='container'>
                <Word/>
                {/* <Loading/> */}
            </div>
        </div>
    )
}

export default Words;