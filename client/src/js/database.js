import { openDB } from 'idb';

const initdb = async () =>
  openDB('textonomy', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('textonomy')) {
        console.log('textonomy database already exists');
        return;
      }
      db.createObjectStore('textonomy', { keyPath: 'id', autoIncrement: true });
      console.log('textonomy database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const textonomyDB = await openDB('textonomy', 1)
  const tx = textonomyDB.transaction('textonomy', 'readwrite')
  const store = tx.objectStore('textonomy')
  const request =store.add(content)

  const result = await request;

  console.log('🚀 - data save successful!', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const textonomyDB = await openDB('textonomy', 1);
  const tx = textonomyDB.transaction('textonomy', 'readonly');
  const store = tx.objectStore('textonomy')
  const request = store.getAll()

  const result = await request;

  console.log('result.value', result);
  return result;
};

initdb();
