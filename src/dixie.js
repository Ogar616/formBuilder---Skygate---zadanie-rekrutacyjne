import Dexie from 'dexie';

const db = new Dexie('structures');
db.version(1).stores({
    structures: '++id, stateId, parentId, type, question, conditionType, firstConditionField, secondConditionField'
});
db.open();

export default db;
