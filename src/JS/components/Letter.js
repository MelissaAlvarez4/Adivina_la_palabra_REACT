import React from 'react';
import '../../CSS/letter.css';
import { useSelector } from 'react-redux';

function Letter(props) {
    const { index, id, handleSlotClick} = props;
    const selectedSlot = useSelector(state => state.slots.selectedSlot);
    const words = useSelector(state => state.slots.words);

    const handleClick = () => {
        handleSlotClick(index);
    };

    const getPosition = () => {
        return selectedSlot[selectedSlot.length-1].index === index && selectedSlot[selectedSlot.length-1].word === id;
    }

    const getColor = () => {
        if(words[id].letterStatus.length > 0) {
            if(words[id].letterStatus[index]?.color) {
                return words[id].letterStatus[index]?.color;
            }
        }
    }

    getColor();
    return (
        <div className='letter' key={index}>
            <div className={`slot ${getColor()} ${getPosition() ? 'selected' : ''}`} onClick={handleClick}>
                <p>{words[id].letters[index]}</p>
            </div>
        </div>
    )
}


export default Letter;