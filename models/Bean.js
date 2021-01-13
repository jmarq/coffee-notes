import { v4 as uuidv4 } from 'uuid';

import { Model } from '@vuex-orm/core';
import Note from './Note';

export default class Bean extends Model {
  static entity = 'beans';

  static fields() {
    return {
      id: this.uid(() => uuidv4()),
      name: this.string('untitled coffee bean'),
      notes: this.hasMany(Note, 'bean_id'),
    };
  }
}
