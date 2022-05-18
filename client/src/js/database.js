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
export const putDb = async (content) => console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
