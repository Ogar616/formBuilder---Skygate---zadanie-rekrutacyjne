import React, { Component } from 'react';

class MainInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: '',
            selectValue: 'Number'
        }
    }

    handleSelectChange = e => {
        this.setState({selectValue:e.target.value});
    }

    handleTextValueChange = e => {
        this.setState({textValue: e.target.value})
    }

    handleDeleteInput = e => {
        e.preventDefault();
        this.props.handleDelete(this.props.index)
    }

    handleAddSubInput = e => {
        e.preventDefault();
        this.props.handleAddSubInput(this.props.index, this.state.textValue, this.state.selectValue)
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
                        <input type='text' 
                               placeholder='Type your qestion'
                               value={this.state.textValue}
                               onChange={this.handleTextValueChange}/>
                    </div>
                    <div className='form-row'>
                        <span>
                            Type
                        </span>
                        <select value={this.state.selectValue} 
                                onChange={this.handleSelectChange}>
                            <option value="Yes / No">Yes / No</option>
                            <option value="Text">Text</option>
                            <option value="Number">Number</option>
                        </select>
                    </div>
                    <div className='buttons'>
                        <button className='btn' onClick={this.handleAddSubInput}>Add Sub-Input</button>
                        <button className='btn' onClick={this.handleDeleteInput}>Delete Input</button>
                    </div>
                </div>
            </fieldset> 
        )
    }
}

export default MainInput;