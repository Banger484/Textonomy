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
  console.log('PUT to the database');
  console.log(content);
  const textonomyDb = await openDB('textonomy', 1);
  const tx = textonomyDb.transaction('textonomy', 'readwrite');
  const store = tx.objectStore('textonomy');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  const textonomyDb = await openDB('textonomy', 1);
  const tx = textonomyDb.transaction('textonomy', 'readonly');
  const store = tx.objectStore('textonomy');
  const request = store.get(1);
  console.log('does the request exist?', request);
  const result = await request;
  console.log('result.content', result.value);
  return result.value;
};

initdb();
