import { v4 as uuidv4 } from 'uuid';

import { Model } from '@vuex-orm/core';
import Batch from './Batch';

export default class Bean extends Model {
  static entity = 'beans';

  static fields() {
    return {
      id: this.uid(() => uuidv4()),
      name: this.string('untitled coffee bean'),
      batches: this.hasMany(Batch, 'bean_id'),
      roast_profile: this.string(undefined).nullable(),
    };
  }
}
