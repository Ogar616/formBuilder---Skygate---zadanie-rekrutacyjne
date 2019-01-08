import React, { Component } from 'react';

class MainInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            type: 'Number'
        }
    }

    handleSelectChange = e => {
        this.setState({ type: e.target.value });
    };

    handleQuestionChange = e => {
        this.setState({ question: e.target.value })
    };

    handleDeleteInput = e => {
        e.preventDefault();
        this.props.handleDelete(this.props.index)
    };

    handleAddSubInput = e => {
        e.preventDefault();
        this.props.handleAddSubInput(this.props.index, this.state.question, this.state.type)
    };

    render() {
        return (
            <>
                <fieldset className='form-wrapper'>
                    <div className='input-container'>
                        <div className='form-row'>
                            <span>
                                Question
                        </span>
                            <input type='text'
                                placeholder='Type your qestion'
                                value={this.state.question}
                                onChange={this.handleQuestionChange} />
                        </div>
                        <div className='form-row'>
                            <span>
                                Type
                        </span>
                            <select value={this.state.type}
                                onChange={this.handleSelectChange}>
                                <option value='Yes / No'>Yes / No</option>
                                <option value='Text'>Text</option>
                                <option value='Number'>Number</option>
                            </select>
                        </div>
                        <div className='buttons'>
                            <button className='btn' onClick={this.handleAddSubInput}>Add Sub-Input</button>
                            <button className='btn' onClick={this.handleDeleteInput}>Delete Input</button>
                        </div>
                    </div>
                </fieldset>
            </>
        )
    }
}

export default MainInput;