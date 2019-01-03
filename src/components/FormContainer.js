import React, { Component } from 'react';
import MainInput from './formComponents/MainInput';
import SubInput from './formComponents/SubInput';
import Dexie from 'dexie';
import db from '../dixie';

class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            structure: ([
            ]),
            newInput: {
                text: '',
                select: '',
                firstConditionFieldValue: '',
                secondConditionFieldValue: ''
            }
        }
    }

    promise = db.structures.toArray().then(response => {
        return response
        }).then(state => {
            const flatState = this.transformToFlatStructure(state)
            this.setState({structure: flatState}, console.log('yy',flatState))
    })


    transformToFlatStructure(array) {
        var result = [];
        array.forEach( a => {
            result.push(a);
            if (Array.isArray(a.children)) {
                result = result.concat(this.transformToFlatStructure(a.children));
            }
        });
        return result;
    };

    transformToTree(list){
        let map = {}, node, roots = [];
        for (let i = 0; i < list.length; i ++) {
            map[list[i].id] = i;
            list[i].children = [];
        }
        for (let i = 0 ; i < list.length ; i++) {
            node = list[i];
            if (node.parentId !== '0') {
                if (list[map[node.parentId]]){
                    list[map[node.parentId]].children.push(node);
                }
            } else {
                roots.push(node);
            }
        }
        return roots;
    };

    generateNewId() {
        let idsArray = [];

        for (let i = 0 ; i < this.state.structure.length ; i++){
           idsArray.push(parseInt(this.state.structure[i].id));
        }
        return (Math.max(...idsArray) + 1).toLocaleString();
    };

    updateDB(){
        const n = 0;
        Dexie.spawn(function*() {
            yield db.structures
            .where('id')
            .above(n.toLocaleString())
            .delete()    
            var tasks = yield db.structures.toArray();
            console.log("Structureeeee" + JSON.stringify(tasks, 0, 2));
        }).catch (err => {
            console.error ('Deleting from db failed' + err.stack);
        });
        const inputs = this.transformToTree(this.state.structure);

        Dexie.spawn(function*() {
            yield db.structures.bulkPut(inputs)
            }).catch (err => {
            console.error ('Ooops' + err.stack);
            });
    };
    
    handleAddMainInput(e){
        e.preventDefault();
        let inputs = this.state.structure;
        let newInput;

        if (inputs.length > 0) {
            newInput = {
                    'id': this.generateNewId(),
                    'parentId': '0', 
                    'type': 'main'
                }
        } else newInput = {
            'id': '1',
            'parentId': '0', 
            'type': 'main'
        };
        inputs.push(newInput);
        this.setState({structure: inputs}, this.updateDB);    
    };

    handleAddSubInput(i, question, type, firstConditionField, secondConditionField) {
        let inputs = this.state.structure;
        const parentInputId = inputs[i].id;

        const subInputStructure = {
            'id': this.generateNewId(),
            'parentId': parentInputId.toLocaleString(),
            'type': 'sub',
        }

        const newStructure = inputs.slice(0, i + 1).concat(subInputStructure, this.state.structure.slice(i + 1));

        newStructure[i].question = question;
        newStructure[i].conditionType = type;
        if(firstConditionField){
            newStructure[i].firstConditionField = firstConditionField;
        }
        if (secondConditionField){
            newStructure[i].secondConditionField = secondConditionField;
        }

        console.log(this.state.structure);
        this.setState({
            structure: newStructure, 
            newInput: {
                text: question, 
                select: type,
                firstConditionFieldValue: firstConditionField,
                secondConditionFieldValue: secondConditionField
            }}, this.updateDB);  
    };

    handleDeleteInput(i) {
        let inputs = this.state.structure;
        const start = i;
        let inputId = inputs[i].id

        inputs.splice(i, 1);

        for (let i = start ; i <= inputs.length ; i++) {
            if (inputs[i]){
                if (inputs[i].parentId === inputId){
                    inputId = inputs[i].parentId;
                    inputs.splice(i, 1);
                    i--;
                    continue;
                }
                if (inputs[i].type === 'main') break;    
            }
        }
        this.setState({structure: inputs}, this.updateDB);
        console.log(this.state.structure);
    };

    render() {
        const inputs = this.state.structure.map((e, i) => {
            if (e.type === 'sub') return (
                <SubInput type='Number' 
                          handleAddSubInput={(e, question, type, firstConditionField, secondConditionField) => this.handleAddSubInput(e, question, type, firstConditionField, secondConditionField)} 
                          handleDelete={e => this.handleDeleteInput(e)} 
                          input={this.state.newInput}
                          index={i} 
                          key={i}/>
            )
            else return (
                <MainInput handleAddSubInput={(e, question, type) => this.handleAddSubInput(e, question, type)} 
                           handleDelete={e => this.handleDeleteInput(e)} 
                           index={i} 
                           key ={i}/>
            )
        })
        return (
            <form className='form-group'>
                {inputs}
                <button className='btn'onClick={e => this.handleAddMainInput(e)}>Add Input</button>
                <button className='btn' onClick={e=>this.handleStore(e)}>######################################</button>
            </form>
        )
    }
}

export default FormContainer;