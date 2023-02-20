import React from 'react';
import Key from './Key';

function KeyboardLine(props) {
    const { keys } = props;

    const keyComponents = keys.map((key, index) => {
        return (
            <Key key={index} value={key.value} color={key.color} />
        );
    });

    return (
        <div className="keyboard-line">
            {keyComponents}
        </div>
    );
}

export default React.memo(KeyboardLine);