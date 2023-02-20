import React from 'react';
import Letter from './Letter'

function Word() {
    const slots = Array(5).fill(null);

    return (
        <div className='word'>
                {
                    slots.map((_, index) => (
                        <Letter key={index}/>
                    ))
                }
        </div>
    )
}

export default Word;