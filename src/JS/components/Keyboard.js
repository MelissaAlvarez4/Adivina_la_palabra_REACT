import React, { useMemo } from 'react';
import '../../CSS/keyboard.css';
import KeyboardLine from './KeyboardLine'

const ENTER_ICON = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" style={{width: '20px', height: '30px'}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"></path></svg>;

function Keyboard() {
    const keyboard = useMemo(() => [
        {
            keys: [
            { value: 'Q' },
            { value: 'W' },
            { value: 'E' },
            { value: 'R'},
            { value: 'T' },
            { value: 'Y' },
            { value: 'U' },
            { value: 'I'},
            { value: 'O' },
            { value: 'P' },
            ],
        },
        {
            keys: [
            { value: 'A'},
            { value: 'S' },
            { value: 'D' },
            { value: 'F' },
            { value: 'G' },
            { value: 'H' },
            { value: 'J' },
            { value: 'K' },
            { value: 'L' },
            { value: 'Ñ' },
            ],
        },
        {
            keys: [
            { value: '↵', isCommand: true },
            { value: 'Z' },
            { value: 'X' },
            { value: 'C' },
            { value: 'V' },
            { value: 'B' },
            { value: 'N' },
            { value: 'M' },
            { value: ENTER_ICON, isCommand: true },
            ],
        },
    ], []);

    return (
        <div className="keyboard">
            {
                keyboard.map((line, index) => (
                    <KeyboardLine key={index} keys={line.keys} />
                ))
            }
        </div>
    )
}

export default React.memo(Keyboard);