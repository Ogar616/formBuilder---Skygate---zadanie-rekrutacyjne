import React from 'react';
import AddDelButtons from './AddDelButtons';
import Condition from './Condition';

const SubInput = () => (
    <li>
            <fieldset className='form-wrapper'>
            sub
                <div className='input-container'>
                    <div className='form-row'>
                        <span>
                            Condition
                        </span>
                        <select className='condition-field'>
                            <option value="Equals">Equals</option>
                            <option value="Greater than">Greater than</option>
                            <option value="Less than">Less than</option>
                        </select>
                            {/* <Condition type={props.type}/> */}
                    </div>
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
    </li>
);

export default SubInput;