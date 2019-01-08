import React, { Component } from 'react';

class SubInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            type: 'Yes / No',
            firstConditionFieldValue: '',
            secondConditionFieldValue: '',
        }
    }

    handleFirstConditionFieldChange = e => {
        this.setState({ firstConditionFieldValue: e.target.value });
    };

    handleSecondConditionFieldChange = e => {
        this.setState({ secondConditionFieldValue: e.target.value });
    };

    handleQuestionChange = e => {
        this.setState({ question: e.target.value });
    };

    handleSelectChange = e => {
        this.setState({ type: e.target.value });
    };

    handleDeleteSubInput = e => {
        e.preventDefault();
        this.props.handleDelete(this.props.index)
    };

    handleAddSubInput = e => {
        e.preventDefault();
        this.props.handleAddSubInput(this.props.index, this.state.question, this.state.type, this.state.firstConditionFieldValue, this.state.secondConditionFieldValue)
    };

    render() {
        let firstConditionField;
        let secondConditionField;

        if (this.props.input.select === 'Text') {
            firstConditionField = (
                <select className='condition-field'
                    onChange={this.handleFirstConditionFieldChange}>
                    <option value='Equals'>Equals</option>
                    <option value='Not equals'>Not equals</option>
                </select>
            );
            secondConditionField = (
                <input className='condition-field' onChange={this.handleSecondConditionFieldChange}></input>
            );
        }
        if (this.props.input.select === 'Number') {
            firstConditionField = (
                <select className='condition-field'
                    onChange={this.handleFirstConditionFieldChange}>
                    <option value='Equals'>Equals</option>
                    <option value='Greater than'>Greater than</option>
                    <option value='Less than'>Less than</option>
                </select>
            );
            secondConditionField = (
                <input className='condition-field' onChange={this.handleSecondConditionFieldChange}></input>
            );
        }
        if (this.props.input.select === 'Yes / No') {
            firstConditionField = (
                <select className='condition-field'
                    onChange={this.handleFirstConditionFieldChange}>
                    <option value='Equals'>Equals</option>
                    <option value='Not equals'>Not equals</option>
                </select>
            );
            secondConditionField = (
                <select className='condition-field' onChange={this.handleSecondConditionFieldChange}>
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                </select>
            );
        }
        return (
            <>
                <fieldset className='form-wrapper' style={{ marginLeft: this.props.margin }}>
                    <div className='input-container'>
                        <div className='form-row'>
                            <span>
                                Condition
                        </span>
                            {firstConditionField}
                            {secondConditionField}
                        </div>
                        <div className='form-row'>
                            <span>
                                Question
                        </span>
                            <input type='text' placeholder='Type your qestion' onChange={this.handleQuestionChange} />
                        </div>
                        <div className='form-row'>
                            <span>
                                Type
                        </span>
                            <select onChange={this.handleSelectChange}>
                                <option value='Yes / No'>Yes / No</option>
                                <option value='Text'>Text</option>
                                <option value='Number'>Number</option>
                            </select>
                        </div>
                        <div className='buttons'>
                            <button className='btn' onClick={this.handleAddSubInput}>Add Sub-Input</button>
                            <button className='btn' onClick={this.handleDeleteSubInput}>Delete Input</button>
                        </div>
                    </div>
                </fieldset>
            </>
        );
    }
}

export default SubInput;