import React, { Component } from 'react';
import MainInput from './formComponents/MainInput';
import SubInput from './formComponents/SubInput';

class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            structure: [
                {
                    'id': '1',
                    'parentId': '0', 
                    'type': 'main'
                      
                },
                {   
                    'id': '2',
                    'parentId': '1',
                    'type': 'sub',
                    'conditiontype': 'Number'
                },
                {
                    'id': '3',
                    'parentId': '0' ,
                    'type': 'main'
                   
                },
                {   
                    'id': '4',
                    'parentId': '3',
                    'type': 'sub',
                    'conditiontype': 'Number'
                },
                {   
                    'id': '5',
                    'parentId': '3',
                    'type': 'sub',
                    'conditiontype': 'Number'
                },

            ]
        }
        this.addMainInput = this.addMainInput.bind(this);
        this.hasChildren = this.hasChildren.bind(this);

    }

    structure = [
        {
            'id': '0',
            'type': 'main'   
        },
        {   
            'id': '1',
            'parentId': '0',
            'type': 'sub',
            'conditiontype': 'Number'
        },
        {
            'id': '2',
            'type': 'main'
        },
        {
            'id': '3',
            'parentId': '2',
            'type': 'sub',
            'conditiontype': 'Text'
        },
        {
            'id': '4',
            'parentId': '2',
            'type': 'sub',
            'conditiontype': 'Bool'
        },
        {
            'id': '5',
            'parentId': '4',
            'type': 'sub',
            'conditiontype': 'Number'
        }
    ]
    
    addMainInput(e){
        e.preventDefault()
        let inputs = this.state.structure;
        if (inputs.length > 0) {
            inputs.push({
                'id': inputs.length.toLocaleString(),
                'type': 'main',
                'parentId': '0' 
            })
        } else inputs.push({
            'id': '1',
            'type': 'main',
            'parentId': '0'
        })
        this.setState({structure: inputs});
    }

    hasChildren(obj){
        return !!obj.children
    }

    listTransform = list => {
        var map = {}, node, roots = [], i;
        for (i = 0; i < list.length; i += 1) {
            map[list[i].id] = i; // initialize the map
            list[i].children = []; // initialize the children
            console.log(list[i].children);
        }
        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            if (node.parentId !== "0") {
                // if you have dangling branches check that map[node.parentId] exists
                list[map[node.parentId]].children.push(node);
            } else {
                roots.push(node);
            }
        }
        console.log(roots);
        return roots;
    }

    handleDeleteSubInput(i) {
        let inputs = this.state.structure;

        inputs.splice(i, 1);
        this.setState({structure: inputs});
    }

    handleDeleteInput(i) {
        let inputs = this.state.structure;
        const inputId = inputs[i].id;

        inputs.splice(i, 1);

        for (let i = 0 ; i < inputs.length ; i++) {
            if (inputs[i].parentId === inputId.toLocaleString()){
                inputs.splice(i, 1)
                i--;
            }
        }
        this.setState({structure: inputs});
    }

    render() {
        const inputs = this.state.structure.map((e, i) => {
            if (e.type === 'sub') return <SubInput type='Number' handleDelete={e => this.handleDeleteSubInput(e)} index={i} key={i}/>
            else return <MainInput handleDelete={e => this.handleDeleteInput(e)} index={i} key ={i}/>
        })
     
        return (
            <form className='form-group'>
                {inputs}
                <button className='btn'onClick={e => this.addMainInput(e)}>Add Input</button>
            </form>
        )
    }
}

export default FormContainer;
