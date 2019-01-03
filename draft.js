addToDB(stateId, parentId, type, question, conditionType, firstConditionField, secondConditionField){
    Dexie.spawn(function*() {
        yield db.structures.put({stateId: stateId, parentId: parentId, type: type, question: question, conditionType: conditionType, firstConditionField: firstConditionField, secondConditionField: secondConditionField});
    }).catch (err => {
        console.error ('Adding to db failed' + err.stack);
    });
}


deleteFromDB(id){
    const r = 500;
    
    // let arr = [];
    
    // for (let i = 0 ; i < this.state.structure.length ; i++){
    //     let temp;
    //     if (this.state.structure[i].parentId === id) {
    //         temp = this.state.structure[i].id
    //     }
    //     if (temp){
    //         for (let j = 0 ; j < this.state.structure.length ; j++){
    //             if (this.state.structure[i].parentId === temp) {
    //                 arr.push(temp);
    //                 arr.push(this.state.structure[i].id)
    //             }
    //         }
    //     }
    // }

    // arr.forEach(e=> {

    // Dexie.spawn(function*() {
    //     yield db.structures
    //     .where('stateId')
    //     .equals(id.toLocaleString())
    //     .delete()    
    // }).catch (err => {
    //     console.error ('Deleting from db failed' + err.stack);
    // });
    // })

    Dexie.spawn(function*() {
        yield db.structures
        .where('stateId')
        .equals(id.toLocaleString())
        .delete()    
        var tasks = yield db.structures.toArray();
    }).catch (err => {
        console.error ('Deleting from db failed' + err.stack);
    });

    Dexie.spawn(function*() {
        yield db.structures
        .where('parentId')
        .equals(id.toLocaleString())
        .delete()    
    }).catch (err => {
        console.error ('Deleting from db failed' + err.stack);
    });
}

handleStore = (e) => {

    e.preventDefault();

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


handleDeleteSubInput(i, r) {
    let inputs = this.state.structure;
    // let inputId = inputs[i].id;

    // inputs.splice(i, 1);
    if (inputs[i].children){
        inputs[i].children.forEach(({children, ...rest}) => {
            r.push(rest);
            if(children) this.handleDeleteSubInput(children, r)
            });
    }
    
    this.setState({structure: inputs}, this.updateDB);
}

promise = db.structures.toArray().then(response => {
    return response
    }).then(state => {
        this.setState({structure: state})
}
    )
