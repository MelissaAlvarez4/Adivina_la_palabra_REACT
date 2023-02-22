import React from 'react';

const ENTER_ICON = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" style={{width: '20px', height: '30px'}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"></path></svg>;
const PATH = 'https://adivina-palabra.fly.dev';
const ERROR_MSG = 'Error initializing game: 404';
const NO_WORD = 'La palabra no está en la lista';
const INCOMPLETE = 'No hay suficientes letras';
const WINNER = 'Has ganado';
const LOSER = 'Has perdido';
const KEYBOARD = [
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
];
const LOADING_IMAGE = <svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#90CAF9">
                            <g fill="none" fillRule="evenodd">
                                <g transform="translate(1 1)" strokeWidth="2">
                                <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                                <path d="M36 18c0-9.94-8.06-18-18-18">
                                    <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" />
                                </path>
                                </g>
                            </g>
                        </svg>

export {
    PATH,
    ERROR_MSG,
    NO_WORD,
    INCOMPLETE,
    WINNER,
    LOSER,
    KEYBOARD,
    LOADING_IMAGE
}