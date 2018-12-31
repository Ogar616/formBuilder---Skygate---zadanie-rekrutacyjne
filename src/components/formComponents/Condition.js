import React from 'react';

const Condition = (props) => {
    if (props.type === 'Text'){
        return (
            <input className='condition-field' value='value' readOnly></input>
        );
    }
    if (props.type === 'Number') {
        return (
            <input className='condition-field' value='4' readOnly></input>
        );
    }
    if (props.type === 'Yes / No') {
        return (
            <select className='condition-field'>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
        );
    }
}

export default Condition;