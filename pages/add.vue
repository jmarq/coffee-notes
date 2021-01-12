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
import Note from '@/models/Note';

export default {
  data() {
    return {
      newNote: '',
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
      setEntities: 'setEntities',
    }),
    ...mapActions(['addNoteAndSave']),
    addCoolNote() {
      if (this.newNote) {
        // add to "regular" store and save to localstorage
        this.addNoteAndSave(this.newNote);

        // add to vuex-orm store
        Note.insert({
          data: {
            content: this.newNote,
            bean: { name: 'cool beans', id: 1 },
          },
        });

        // this state, stringified from a testing run
        // const theState = `{"$name":"entities","notes":{"$connection":"entities","$name":"notes","data":{"$uid1":{"id":"$uid1","content":"bean","bean_id":"1","bean":null,"$id":"$uid1"},"$uid2":{"id":"$uid2","content":"bean2","bean_id":"1","bean":null,"$id":"$uid2"},"$uid3":{"id":"$uid3","content":"bean23","bean_id":"1","bean":null,"$id":"$uid3"}}},"beans":{"$connection":"entities","$name":"beans","data":{"1":{"id":1,"name":"cool beans","notes":[],"$id":"1"}}}}`;
        // set the whole vuex-orm state to it! perhaps for load-from-localstorage flow at startup
        // const parsedState = JSON.parse(theState);
        // this.setEntities(parsedState);

        // exploratory logging
        // TODO: remove when settled.
        // what does the vuex-orm state look like?
        console.log(JSON.stringify(this.$store.state.entities));
        // did it create the bean entry from the inline object in .insert?
        console.log(Note.query().with('bean').get()[0].bean);

        this.newNote = '';
      }
    },
  },
};
</script>
