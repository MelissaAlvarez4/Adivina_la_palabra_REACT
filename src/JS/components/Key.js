import React from 'react';

function Key(props) {
    const { value, color } = props;

    return (
        <div className={`key ${color}`}>{value}</div>
    );
}

export default React.memo(Key);