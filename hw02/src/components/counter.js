import React from 'react';
export default function Counter(props) {
    const { count } = props;

    return (
        <div className="counter">
            <p><span className="number">{count}</span> jobs left</p>
        </div>
    );
}
