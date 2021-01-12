import { Database } from '@vuex-orm/core';
import Note from '@/models/Note';
import Bean from '@/models/Bean';

const database = new Database();

database.register(Note);
database.register(Bean);

export default database;
