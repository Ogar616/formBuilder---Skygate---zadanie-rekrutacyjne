import Dexie from 'dexie';

const db = new Dexie('structures');
db.version(1).stores({
    structures: '++id, stateId, parentId, type, question, conditionType, firstConditionField, secondConditionField'
});
db.open();

export default db;


// Dexie.spawn(function*() {
//     var id = yield db.tasks.put({date: Date.now(), description: 'Test Dexie', done: 0});
//     console.log("Got id " + id);
//     // Now lets add a bunch of tasks
//     yield db.tasks.bulkPut([
//         {date: Date.now(), description: 'Test Dexie bulkPut()', done: 1},
//         {date: Date.now(), description: 'Finish testing Dexie bulkPut()', done: 1}
//     ]);
    // Ok, so let's query it
    
//     var tasks = yield db.tasks.where('done').above(0).toArray();
//     console.log("Completed tasks: " + JSON.stringify(tasks, 0, 2));

//     // Ok, so let's complete the 'Test Dexie' task.
//     yield db.tasks
//         .where('description')
//         .startsWithIgnoreCase('test dexi')
//         .modify({done: 1});

//     console.log ("All tasks should be completed now.");
//     console.log ("Now let's delete all old tasks:");

//     // And let's remove all old tasks:
//     yield db.tasks
//         .where('date')
//         .below(Date.now())
//         .delete();

//     console.log ("Done.");

// }).catch (err => {
//     console.error ("Uh oh! " + err.stack);
// });