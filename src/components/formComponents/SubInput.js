import React, { Component } from 'react';
import Condition from './Condition';

class SubInput extends Component {
    constructor(props){
        super(props);
        this.handleDeleteSubInput = this.handleDeleteSubInput.bind(this);
    }

    handleDeleteSubInput = e => {
        e.preventDefault();
        this.props.handleDelete(this.props.index)
    }

    render() {
        return (
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
                            <Condition type={this.props.type}/>
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
                    <div className='buttons'>
                        <button className='btn'>Add Sub-Input</button>
                        <button className='btn' onClick={this.handleDeleteSubInput}>Delete Input</button>
                    </div>
                </div>
            </fieldset>
        );
    }
}

export default SubInput;