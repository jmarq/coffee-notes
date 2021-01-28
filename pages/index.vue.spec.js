import { mount, createLocalVue } from '@vue/test-utils';
import Index from '@/pages/index.vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import VuexORMLocalForage from 'vuex-orm-localforage';
import database from '@/database';

const localVue = createLocalVue();

localVue.use(Vuex);
VuexORM.use(VuexORMLocalForage, { database });

const mockRoute = {
  query: {
    newId: 'fakeId',
  },
};

describe('index page', () => {
  let actions, state, mutations, plugins;
  let store;
  beforeEach(() => {
    actions = {
      saveNotes: jest.fn(),
      loadNotes: jest.fn(),
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
  });

  it('is a Vue instance', () => {
    const wrapper = mount(Index, {
      store,
      localVue,
      mocks: {
        $route: mockRoute,
      },
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
