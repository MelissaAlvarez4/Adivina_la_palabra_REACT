import React, { useRef } from 'react';
import Letter from './Letter'
import { useSelector } from 'react-redux';

function Word() {
    const slots = Array(5).fill(null);
    return (
        <div className='word'>
                {
                    slots.map((_, i) => (
                        <Letter key={i} index={i}/>
                    ))
                }
        </div>
    )
}

export default Word;