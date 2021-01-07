import { mount, createLocalVue } from '@vue/test-utils';
import Index from '@/pages/index.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('index page', () => {
  let actions, state, mutations;
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
    store = new Vuex.Store({
      actions,
      state,
      mutations,
    });
  });

  it('is a Vue instance', () => {
    const wrapper = mount(Index, { store, localVue });
    expect(wrapper.vm).toBeTruthy();
  });
});
