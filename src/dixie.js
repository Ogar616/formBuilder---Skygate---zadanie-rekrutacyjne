import Dexie from 'dexie';

const db = new Dexie('structures');
db.version(1).stores({
    structures: '++id, stateId, parentId, type, question, conditionType, firstConditionField, secondConditionField'
});

export default db;