import React from 'react';
import '../../CSS/error.css';

function Error() {
    return (
    <div className="error">
        <div className="overlay"></div>
        <div>
            <p>La palabra no está en la lista</p>
        </div>
    </div>
    )
}

export default Error;