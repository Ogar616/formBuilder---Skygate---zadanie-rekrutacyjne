import React, { Component } from 'react';
import Button from './formComponents/Button';
import MainInput from './formComponents/MainInput';
import SubInput from './formComponents/SubInput';

class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            1: {
                1: {
                    1:1
                },
                2: {
                    1: 1,
                    2: 2
                }
            },
            2: {
                1: {
                    1:2
                }
            }
        }
    }

    addMainInput = () => {
     
    }

    render() {
        let allInputs = [];
        for (const key of Object.keys(this.state)) {
            allInputs.push(<MainInput/>);
            console.log(key, this.state[key]);
        }
        return (
            <form className='form-group'>
                <Button onClick={this.addMainInput} text='Add Input'/>
                <MainInput/>
                <SubInput/>
            </form>
        )
    }
}

export default FormContainer;