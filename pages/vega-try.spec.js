import { mount, createLocalVue } from '@vue/test-utils';
import VegaTry from '@/pages/vega-try.vue';
import { addFakeBatches, addFakeBeans } from '@/helpers/dataHelpers';

import Vuex from 'vuex';

import VuexORM from '@vuex-orm/core';
import VuexORMLocalForage from 'vuex-orm-localforage';
import database from '@/database';

import flushPromises from 'flush-promises';
// import Batch from '@/models/Batch';
import Bean from '@/models/Bean';

// jest.mock('@/models/Batch');
// jest.mock('@/models/Bean');

const localVue = createLocalVue();

localVue.use(Vuex);
VuexORM.use(VuexORMLocalForage, { database });

describe('vega page', () => {
  let actions, state, mutations, plugins, beanIds;
  let store;
  beforeEach(async () => {
    actions = {
      saveNotes: jest.fn(),
      loadNotes: jest.fn(),
      addNoteAndSave: jest.fn(),
      saveEntities: jest.fn(() => {
        console.log('in mock saveEntities');
      }),
    };
    state = {
      notes: ['yes', 'no', 'villain'],
    };
    mutations = {
      addNote: jest.fn(),
    };

    plugins = [VuexORM.install(database)];

    store = new Vuex.Store({
      actions,
      state,
      mutations,
      plugins,
    });

    beanIds = await addFakeBeans(10);
    await addFakeBatches(15, beanIds);

    await Bean.insert({
      data: { id: 1, name: 'testBean', roast_profile: 'medium' },
    });
  });
  it('renders without choking', async () => {
    const wrapper = mount(VegaTry, { store, localVue });
    await flushPromises();
    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.find('svg').exists()).toBeTruthy();
    expect(wrapper.findAll('path[aria-roledescription="bar"]').length).toBe(15);
  });
});
