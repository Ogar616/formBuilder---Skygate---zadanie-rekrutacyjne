import React, { Component } from 'react';
import MainInput from './formComponents/MainInput';
import SubInput from './formComponents/SubInput';
import Dexie from 'dexie';
import db from '../dixie';



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
                firstConditionFieldValue: '',
                secondConditionFieldValue: ''
            }
        }
    }

    generateNewId() {
        let idsArray = [];

        for (let i = 0 ; i < this.state.structure.length ; i++){
           idsArray.push(parseInt(this.state.structure[i].id));
        }
        return (Math.max(...idsArray) + 1).toLocaleString();
    }
    
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
            'id': 0,
            'parentId': '0', 
            'type': 'main'
        };
        inputs.push(newInput);
    
        this.addToDB(newInput.id, newInput.parentId, newInput.type);
        this.setState({structure: inputs});
    }

    listTransform = list => {
        let map = {}, node, roots = [];
        for (let i = 0; i < list.length; i ++) {
            map[list[i].id] = i;
            list[i].children = [];
        }
        for (let i = 0 ; i < list.length ; i++) {
            node = list[i];
            if (node.parentId !== '0') {
                list[map[node.parentId]].children.push(node);
            } else {
                roots.push(node);
            }
        }
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

    handleStore = (e) => {

        e.preventDefault();
        // const inputs = [
        //     {
        //         'id': '1',
        //         'parentId': '0', 
        //         'type': 'main'     
        //     }
        // ]
        

        // db.open();

        Dexie.spawn(function*() {
            const id = yield db.structures.put({stateId: 5, parentId: 0, type: 'main', question: 'ques', conditionType: 'Yes / No', firstConditionField: 'Greater Than', secondConditionField: '333'});
            console.log("Got id " + id);
            console.log(db.structures);

            var tasks = yield db.structures.toArray();
            console.log("Structure" + JSON.stringify(tasks, 0, 2));
            // Now lets add a bunch of tasks
            // yield db.tasks.bulkPut([
            //     {id: 1, parentId :0, type: 'main', questio: 'questionnn', conditionType: 'Yes / No', firstConditionField: 'Less Than', secondConditionField: 33},
            //     {id: 1, parentId :0, type: 'sub', questio: 'questionnn2222', conditionType: 'Yes / No', firstConditionField: 'Greater Than', secondConditionField: 44}
            // ]);
            // // Ok, so let's query it

        //     yield db.tasks
        // .where('id')
        // .below(9999)
        // .delete();
    
        }).catch (err => {
            console.error ("Oooops! Something is wrong " + err.stack);
        });

    }

    addToDB(stateId, parentId, type, question, conditionType, firstConditionField, secondConditionField){
        Dexie.spawn(function*() {
            const id = yield db.structures.put({stateId: stateId, parentId: parentId, type: type, question: question, conditionType: conditionType, firstConditionField: firstConditionField, secondConditionField: secondConditionField});
   
            var tasks = yield db.structures.toArray();
            console.log("Structure" + JSON.stringify(tasks, 0, 2));
        }).catch (err => {
            console.error ("Oooops! Something is wrong " + err.stack);
        });
    }

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

        this.addToDB(subInputStructure.id, subInputStructure.parentId, subInputStructure.type, newStructure[i].question, newStructure[i].conditionType, newStructure[i].firstConditionField,newStructure[i].secondConditionField)
        this.setState({
            structure: newStructure, 
            newInput: {
                text: question, 
                select: type,
                firstConditionFieldValue: firstConditionField,
                secondConditionFieldValue: secondConditionField
            }}
        );
    }

    render() {
        const inputs = this.state.structure.map((e, i) => {
            if (e.type === 'sub') return (
                <SubInput type='Number' 
                          handleAddSubInput={(e, question, type, firstConditionField, secondConditionField) => this.handleAddSubInput(e, question, type, firstConditionField, secondConditionField)} 
                          handleDelete={e => this.handleDeleteSubInput(e)} 
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


// structures: 'id, parentId, type, question, conditionType, firstConditionField, secondConditionField'