import React, { Component } from 'react';
import MainInput from './formComponents/MainInput';
import SubInput from './formComponents/SubInput';

class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            structure: [
                {
                    type: 'Text'
                },
                {   
                    children: [{
                        type: 'Text'
                    }]
                },
                {
                    children: [{
                        type: 'Number',
                        children: [{
                            type: 'Number',
                        }]
                    }]
                }
            ]
           
        }
        this.addMainInput = this.addMainInput.bind(this);
        this.hasChildren = this.hasChildren.bind(this);
    }

    addMainInput(){
        console.log('Add Input')
    }

   hasChildren(obj){
        return !!obj.children
    }

    list(data) {
        const children = children => {
          if (children) {
            return (     <ul> <MainInput>
                <SubInput>
{ this.list(children) }  
                </SubInput>
            </MainInput>
                                             
                        </ul>
                       
                       )
            
            
        }
      }
      
      return data.map((node, index) => {
        console.log(node.children);
        let chi;
        if (children(node.children)){
            chi = node.children;
        }
        return <MainInput children={node.children}>
               
          
          { children(node.children) }

            </MainInput>
      })
    }

    render() {
        return (
            <form className='form-group'>
                <button className='btn'onClick={this.addMainInput}>Add Input</button>
                {/* <MainInput/>
                <SubInput type='Number'/> */}
                {this.list(this.state.structure)}
            </form>
        )
    }
}

export default FormContainer;

// const recurr = (prop) => {
//     for (const key of Object.keys(prop)) {
//         parent = prop[key];
//         if (parent) {
//             for (const key of Object.keys(parent)) {
//                 child = parent[key];
//                 if (child.hasOwnProperty('2')) {
//                     recurr(parent);
//                     allInputs.push(1); 
//                 } else {
//                     allInputs.push(0); 
//                 }
//             }
//         }
        
//     }
// }

// let allInputs = [];
        // let parent;
        // // let child;
        // const recurr = (prop) => {
        //     for (const key of Object.keys(prop)) {
        //         parent = prop[key];
        //         if(parent) {
        //             if (parent.hasOwnProperty('1')) {
        //                 recurr(parent);
        //                 allInputs.push(1); 
        //             } else {
        //                 allInputs.push(0); 
        //             }
        //         }
        //     }
        // }
        // recurr(this.state);
        // console.log(allInputs);

//console.log('ddd')

// const arr = [0, 1,2,[3,4],5,[6,7,[0, 0, 0], 8],9]

// const rec = a => {
//     a.forEach((e,i) => {
//         if(typeof e === 'object'){
//             rec(e);
//         }    
//         console.log('index: ' +  i + ' ' + 'e: ' + e)
//     });
// }

// const ob = {
//     a: 1,
//     b: {
//         c: 2,
//         d: {
//             e: 3
//         }
//     },
//     f: {
//         g: 4
//     },
//     h: {
//         i: 5,
//         j: 6,
//         k: {
//             l: 7,
//             m: 8,
//             n: {
//                 o:{
//                     p:{
//                         r:{
//                             s: 9,
//                             t: 0
//                         }
//                     }
//                 }
//             }
//         }
//     },
//     u: 10
// }

//console.log(arr);
// console.log('  ')
//rec(arr);

// console.log(ob);

// const r = o => {
//     for (const key of Object.keys(o)) {
//         if (typeof o[key] !== 'object'){
//             console.log(o[key])
//         }
//         if (typeof o[key] === 'object'){
//             let temp = o[key];
//             for (const key of Object.keys(temp)) {
//                 r(temp);
//                 console.log(temp)
//             }
            
//         }
       
//     }
// }
// r(ob);

// console.log(' ')
// console.log(' ')
// console.log(' ')
// console.log(' ')
// console.log(' ')
// console.log(' ');

