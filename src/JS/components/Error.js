import React from 'react';
import '../../CSS/error.css';
import { useSelector } from 'react-redux';

function Error() {
    const { errorMessage }  = useSelector(state => state.slots.error);
    return (
    <div className="error">
        <div className="overlay"></div>
        <div>
            <p>{errorMessage}</p>
        </div>
    </div>
    )
}

export default Error;