import React from 'react';
import Letter from './Letter'
import { selectSlot } from '../reducers/slotsSlice';
import { useDispatch } from 'react-redux';

function Word(props) {
    const { id } = props;
    const slots = Array(5).fill(null);
    const dispatch = useDispatch();
    
    const handleSlotClick = (index) => {
        dispatch(selectSlot({index: index, word: id}));
    }

    return (
        <div className='word'>
                {
                    slots.map((_, i) => (
                        <Letter key={i} index={i} id={id} handleSlotClick={handleSlotClick}/>
                    ))
                }
        </div>
    )
}

export default React.memo(Word);