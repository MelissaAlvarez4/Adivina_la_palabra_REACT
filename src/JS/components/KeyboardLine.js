import React from 'react';
import Key from './Key';

function KeyboardLine(props) {
    const { keys } = props;

    return (
        <div className="keyboard-line">
            {
                keys.map((key, index) => (
                    <Key 
                        key={index}
                        position={index}
                        value={key.value} 
                        command={key.isCommand} />
                ))
            }
        </div>
    );
}

export default React.memo(KeyboardLine);