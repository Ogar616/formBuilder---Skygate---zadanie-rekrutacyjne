import React from 'react';

const Button = (props) => (
    <button type='button' className="btn">
            {props.text}
    </button>
);

export default Button;