<template>
  <div class="wrapper">
    <h1 class="title">add a new coffee note please</h1>
    <n-link class="link" to="/">home</n-link>
    <form>
      <input v-model="newNote" type="text" />
      <button class="coffee-button" @click.prevent="addCoolNote">
        add it please
      </button>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  data() {
    return {
      newNote: 'init',
    };
  },
  computed: {
    ...mapState({
      notes: 'notes',
    }),
  },
  methods: {
    ...mapMutations({
      addNote: 'addNote',
    }),
    ...mapActions(['addNoteAndSave']),
    addCoolNote() {
      if (this.newNote) {
        this.addNoteAndSave(this.newNote);
        this.newNote = '';
      }
    },
  },
};
</script>
