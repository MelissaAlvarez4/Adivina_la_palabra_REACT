import React from 'react';
import '../../CSS/letter.css';
import { useSelector } from 'react-redux';

function Letter(props) {
    const { index, id, handleSlotClick} = props;
    const { letterStatus, letters } = useSelector(state => state.slots.words[id]);
    const { selectedSlot } = useSelector(state => state.slots);

    const handleClick = () => {
        handleSlotClick(index);
    };

    const getPosition = () => selectedSlot[selectedSlot.length - 1]?.index === index && selectedSlot[selectedSlot.length - 1]?.word === id;

    const getColor = () => letterStatus[index]?.color || '';

    return (
        <div className='letter' key={index}>
            <div className={`slot ${getColor()} ${getPosition() ? 'selected' : ''}`} onClick={handleClick}>
                <p>{letters[index]}</p>
            </div>
        </div>
    )
}

export default React.memo(Letter);