import { v4 as uuidv4 } from 'uuid';

import { Model } from '@vuex-orm/core';
import Bean from './Bean';
export default class Batch extends Model {
  static entity = 'batches';

  static fields() {
    return {
      id: this.uid(() => uuidv4()),
      bean_id: this.string(null).nullable(),
      bean: this.belongsTo(Bean, 'bean_id'),
      note: this.string('no note provided'),
      date: this.number(undefined).nullable(),
      grind_size: this.number(undefined).nullable(),
      batch_size_oz: this.number(undefined).nullable(),
      // g makes more sense as a unit for grounds.
      // need to look into migration path for changing a field name
      // deprecate the field and create a new one?
      // helper methods for converting/hydrating new field?
      grinds_oz: this.number(undefined).nullable(),
      rating: this.number(undefined).nullable(),
    };
  }
}
