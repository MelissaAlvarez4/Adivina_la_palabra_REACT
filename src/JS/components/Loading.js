import React from 'react';
import '../../CSS/loading.css';
import { LOADING_IMAGE } from '../constants'

function Loading() {
    return (
        <div className="loading">
            {LOADING_IMAGE}
        </div>
    );
}

export default Loading;