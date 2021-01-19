import Batch from '@/models/Batch';
import Bean from '@/models/Bean';
import Faker from 'faker';

import { fakeBean, fakeBatch, MOCK_FLAG } from '@/helpers/mockBuilders';

export const allBeans = () => {
  return Bean.all();
};

export const allBatches = () => {
  return Batch.query().with('bean').get();
};

export const allFakeBeans = () => {
  return Bean.query()
    .where((bean) => bean.id.includes(MOCK_FLAG))
    .get();
};

export const allFakeBatches = () => {
  return Batch.query()
    .where((batch) => batch.id.includes(MOCK_FLAG))
    .with('bean')
    .get();
};

export const addFakeBeans = (numBeans) => {
  const resultIds = [];
  const recordsToAdd = [];
  for (let i = 0; i < numBeans; i += 1) {
    const newBean = fakeBean();
    resultIds.push(newBean.id);
    recordsToAdd.push(newBean);
  }
  Bean.insert({
    data: recordsToAdd,
  });
  return resultIds;
};

export const addFakeBatches = (numBatches, beanIds) => {
  const resultIds = [];
  const recordsToAdd = [];
  for (let i = 0; i < numBatches; i += 1) {
    const beanId = Faker.random.arrayElement(beanIds);
    const newBatch = fakeBatch(beanId);
    resultIds.push(newBatch.id);
    recordsToAdd.push(newBatch);
  }
  Batch.insert({
    data: recordsToAdd,
  });
  return resultIds;
};
