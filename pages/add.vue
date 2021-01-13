<template>
  <div class="wrapper">
    <h1 class="title">add a new coffee note please</h1>
    <n-link class="link" to="/">home</n-link>
    <form>
      <input v-model="newNoteContent" type="text" />
      <button class="coffee-button" @click.prevent="addCoolNote">
        save note
      </button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Note from '@/models/Note';

export default {
  data() {
    return {
      newNoteContent: '',
    };
  },
  computed: {
    ...mapState({
      notes: 'notes',
    }),
  },
  methods: {
    ...mapActions(['addNoteAndSave', 'saveEntities']),
    addCoolNote() {
      if (this.newNoteContent) {
        // add to vuex-orm store
        Note.insert({
          data: {
            content: this.newNoteContent,
            bean: { name: 'cool beans', id: 1 },
          },
        });
        // save to localstorage (this probably should not be a mutation, rather a helper/plugin?)
        console.log('attempting to call this.saveEntities from add.vue');
        this.saveEntities();

        this.newNoteContent = '';
      }
    },
  },
};
</script>
