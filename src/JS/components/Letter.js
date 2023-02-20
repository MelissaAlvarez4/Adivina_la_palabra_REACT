import React from 'react';
import '../../CSS/letter.css';

function Letter(props) {
    const { key } = props
    return (
        <div className="letter" key={key}>
            <div className="slot">
            </div>
        </div>
    )
}

export default Letter;