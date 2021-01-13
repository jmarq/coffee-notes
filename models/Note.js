import { v4 as uuidv4 } from 'uuid';

import { Model } from '@vuex-orm/core';
import Bean from './Bean';
export default class Note extends Model {
  static entity = 'notes';

  static fields() {
    return {
      id: this.uid(() => uuidv4()),
      content: this.string('no content provided'),
      bean_id: this.string(null).nullable(),
      bean: this.belongsTo(Bean, 'bean_id'),
    };
  }
}
