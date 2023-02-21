import React, { useState, useEffect } from 'react';
import '../../CSS/letter.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectSlot } from '../reducers/slotsSlice';

function Letter(props) {
    const { index } = props;
    const dispatch = useDispatch();
    const selectedSlot = useSelector(state => state.slots.selectedSlot);
    const letters = useSelector(state => state.slots.letters);
    const letterStatus = useSelector((state) => state.slots.letterStatus);

    const handleSlotClick = () => {
        dispatch(selectSlot(index));
    }

    return (
        <div className='letter' key={index}>
            <div className={`slot ${letterStatus[index]?.color} ${selectedSlot === index ? 'selected' : ''}`} onClick={handleSlotClick}>
                <p>{letters[index]}</p>
            </div>
        </div>
    )
}

export default Letter;