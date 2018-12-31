import React, { Component } from 'react';

class MainInput extends Component {
    constructor(props){
        super(props);
        this.handleDeleteInput = this.handleDeleteInput.bind(this);
    }

    handleDeleteInput = e => {
        e.preventDefault();
        this.props.handleDelete(this.props.index)
    }

    render() {
        return ( 
            <fieldset className='form-wrapper'>
                main
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
                    <div className='buttons'>
                        <button className='btn'>Add Sub-Input</button>
                        <button className='btn' onClick={this.handleDeleteInput}>Delete Input</button>
                    </div>
                </div>
            </fieldset> 
        )
    }
}

export default MainInput;