import { mount, createLocalVue } from '@vue/test-utils';
import AddPage from '@/pages/add.vue';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate';

import VuexORM from '@vuex-orm/core';
import database from '@/database';

import flushPromises from 'flush-promises';
// import VueRouter from 'vue-router';
// import Batch from '@/models/Batch';
import Bean from '@/models/Bean';

// jest.mock('@/models/Batch');
// jest.mock('@/models/Bean');

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Vuelidate);

const mockRouter = {
  push: jest.fn(),
};

describe('add page', () => {
  let actions, state, mutations, plugins;
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

    await Bean.insert({
      data: { name: 'testBean', roast_profile: 'medium' },
    });
  });
  it('is a Vue instance', () => {
    const wrapper = mount(AddPage, { store, localVue });
    expect(wrapper.vm).toBeTruthy();
  });

  it('does not render submit button if the form is not valid', () => {
    const wrapper = mount(AddPage, { store, localVue });
    const theButton = wrapper.find('.coffee-button');
    expect(theButton.exists()).toEqual(false);
    // await theButton.trigger('click');
    // expect(actions.addNoteAndSave).not.toHaveBeenCalled();
  });

  // lol break this up.
  it('allows submission and redirect if form is valid', async () => {
    const wrapper = mount(AddPage, {
      store,
      localVue,
      mocks: {
        $router: mockRouter,
      },
    });
    // const theInput = wrapper.find('input');
    // const newNoteValue = 'here is a note';
    // theInput.setValue(newNoteValue);

    const invalidWarning = wrapper.find('.invalid-warning');
    expect(invalidWarning.exists()).toEqual(true);

    const beanSelect = wrapper.find('select#bean-select');
    expect(beanSelect.exists()).toEqual(true);
    // await beanSelect.setValue('beanId1');
    const options = beanSelect.findAll('option');
    await options.at(1).setSelected();
    await beanSelect.trigger('change');
    const batchSizeInput = wrapper.find('input#batch_size_oz');
    expect(batchSizeInput.exists()).toEqual(true);
    await batchSizeInput.setValue(40);

    const theButton = wrapper.find('.coffee-button');
    expect(theButton.exists()).toEqual(true);

    await theButton.trigger('click');
    await flushPromises();

    expect(actions.saveEntities).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalled();
  });
});
