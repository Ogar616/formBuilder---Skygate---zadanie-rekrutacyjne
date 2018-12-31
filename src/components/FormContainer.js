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
                }
            ],
            newInput: {
                text: '',
                select: '',
                firstFieldValue: '',
                secondFieldValue: ''
            }
        }
        this.addMainInput = this.addMainInput.bind(this);
        this.hasChildren = this.hasChildren.bind(this);
        this.handleAddSubInput = this.handleAddSubInput.bind(this);

    }

    generateNewId() {
        let idsArray = [];

        for (let i = 0 ; i < this.state.structure.length ; i++){
           idsArray.push(parseInt(this.state.structure[i].id));
        }

        return (Math.max(...idsArray) + 1).toLocaleString();
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
        e.preventDefault();
        let inputs = this.state.structure;

        if (inputs.length > 0) {
            inputs.push({
                'id': this.generateNewId(),
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

    handleAddSubInput(i, textV, selectV, firstField, secondField) {
        let inputs = this.state.structure;
        const parentInputId = inputs[i].id;

        const subInputStructure = {
            'id': this.generateNewId(),
            'parentId': parentInputId.toLocaleString(),
            'type': 'sub',
        }

        const newStructure = inputs.slice(0, i + 1).concat(subInputStructure, this.state.structure.slice(i + 1));

        newStructure[i].question = textV;
        newStructure[i].conditionType = selectV;
        if(firstField){
            newStructure[i].firstField = firstField;
        }
        if (secondField){
            newStructure[i].secondField = secondField;
        }

        this.setState({
            structure: newStructure, 
            newInput: {
                text: textV, 
                select: selectV,
                firstFieldValue: firstField,
                secondFieldValue: secondField
            }}
        );
        console.log(newStructure);

    }

    render() {
        const inputs = this.state.structure.map((e, i) => {
            if (e.type === 'sub') return (
                <SubInput type='Number' 
                          handleAddSubInput={(e, textV, selectV, firstField, secondField) => this.handleAddSubInput(e, textV, selectV, firstField, secondField)} 
                          handleDelete={e => this.handleDeleteSubInput(e)} 
                          input={this.state.newInput}
                          index={i} 
                          key={i}/>
            )
            else return (
                <MainInput handleAddSubInput={(e, textV, selectV) => this.handleAddSubInput(e, textV, selectV)} 
                           handleDelete={e => this.handleDeleteInput(e)} 
                           index={i} 
                           key ={i}/>
            )
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
