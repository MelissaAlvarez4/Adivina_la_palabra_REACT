import React, { useMemo } from 'react';
import '../../CSS/keyboard.css';
import KeyboardLine from './KeyboardLine';
import { KEYBOARD } from '../constants';

function Keyboard() {
    const keyboard = useMemo(() => KEYBOARD, []);

    return (
    <div className="keyboard">
        {
            keyboard.map((line, index) => (
                <KeyboardLine key={index} keys={line.keys} />
            ))
        }
    </div>
    );
    }

export default React.memo(Keyboard);
