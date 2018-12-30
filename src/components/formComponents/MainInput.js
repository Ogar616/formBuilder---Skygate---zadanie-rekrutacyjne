import React from 'react';
import AddDelButtons from './AddDelButtons';

const MainInput = () => (
    <fieldset className='form-wrapper'>
        <div className='input-container'>
            <div className='form-row'>
                <span>
                    Question
                </span>
                <input type='text' placeholder='Type your qestion'/>
            </div>
            <div className='form-row'>
                <span>
                    Type
                </span>
                <select>
                    <option value="Yes / No">Yes / No</option>
                    <option value="Text">Text</option>
                    <option value="Number">Number</option>
                </select>
            </div>
            <AddDelButtons/>
        </div>
    </fieldset>
);

export default MainInput;