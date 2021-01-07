import { mount, createLocalVue } from '@vue/test-utils';
import AddPage from '@/pages/add.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('add page', () => {
  let actions, state, mutations;
  let store;
  beforeEach(() => {
    actions = {
      saveNotes: jest.fn(),
      loadNotes: jest.fn(),
      addNoteAndSave: jest.fn(),
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
    const wrapper = mount(AddPage, { store, localVue });
    expect(wrapper.vm).toBeTruthy();
  });

  it('does not try to add note and save on button click if no note has been entered', async () => {
    const wrapper = mount(AddPage, { store, localVue });
    const theButton = wrapper.find('.coffee-button');
    await theButton.trigger('click');
    expect(actions.addNoteAndSave).not.toHaveBeenCalled();
  });

  it('attempts to add and save note if one has been entered and user clicks button', async () => {
    const wrapper = mount(AddPage, { store, localVue });
    const theInput = wrapper.find('input');
    const newNoteValue = 'here is a note';
    theInput.setValue(newNoteValue);
    const theButton = wrapper.find('.coffee-button');
    await theButton.trigger('click');
    expect(actions.addNoteAndSave).toHaveBeenCalledWith(
      expect.anything(),
      newNoteValue
    );
  });
});
