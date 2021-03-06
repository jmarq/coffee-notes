import Batch from '@/models/Batch';
import Bean from '@/models/Bean';
import Faker from 'faker';

import { fakeBean, fakeBatch, MOCK_FLAG } from '@/helpers/mockBuilders';

export const allBeans = () => {
  return Bean.all();
};

export const findBean = (beanId) => {
  return Bean.find(beanId);
};

export const allBatches = () => {
  return Batch.query().with('bean').orderBy('date', 'desc').get();
};

export const mostRecentBatch = () => {
  return Batch.query().with('bean').orderBy('date', 'desc').first();
};

export const createBatch = (payload) => {
  return Batch.$create({
    data: payload,
  }).then((result) => {
    // result is an array when using localforage create
    // array might contain a bean or a batch depending on the creation
    // pick the result that has a "note" or some other batch-specific field?
    const createdBatch = result.filter(
      (r) => typeof r.batch_size_oz !== 'undefined'
    )[0];
    return createdBatch;
  });
};

export const deleteBatch = (batchId) => {
  return Batch.$delete(batchId);
};

export const deleteBean = (beanId) => {
  return Bean.$delete(beanId);
};

export const deleteAllFakeBatches = () => {
  return Batch.$delete((batch) => batch.id.includes(MOCK_FLAG));
};

export const deleteAllFakeBeans = () => {
  return Bean.$delete((bean) => bean.id.includes(MOCK_FLAG));
};

export const deleteAllFakeData = () => {
  deleteAllFakeBatches();
  deleteAllFakeBeans();
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
  Bean.$create({
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
  Batch.$create({
    data: recordsToAdd,
  });
  return resultIds;
};
