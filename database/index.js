import { Database } from '@vuex-orm/core';
import Batch from '@/models/Batch';
import Bean from '@/models/Bean';

const database = new Database();

database.register(Batch);
database.register(Bean);

export default database;
