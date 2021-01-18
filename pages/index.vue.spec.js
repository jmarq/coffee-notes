import { mount, createLocalVue } from '@vue/test-utils';
import Index from '@/pages/index.vue';
import Vuex from 'vuex';

import Batch from '@/models/Batch';
import Bean from '@/models/Bean';

jest.mock('@/models/Batch');
jest.mock('@/models/Bean');

const localVue = createLocalVue();

localVue.use(Vuex);

const mockRoute = {
  query: {
    newId: 'fakeId',
  },
};

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
    // big dumb mock, let's refactor this code into a helper method
    Batch.query = jest.fn(() => {
      return {
        with: () => {
          return {
            get: () => {
              return [
                {
                  bean: {
                    id: 'fakeId',
                    name: 'fakeBean',
                    roastProfile: 'medium',
                  },
                  note: 'was good',
                  date: Date.now(),
                },
              ];
            },
          };
        },
      };
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
